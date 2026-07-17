import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CampaignStatus } from '../models/status.model';

export interface CampaignAnalytics {
  campaignId: number;
  totalSent: number;
  totalOpened: number;
  totalClicked: number;
  totalNotReached: number;
  totalNotOpened: number;
  openRate: string;
  clickRate: string;
  bounceRate: string;
}

@Injectable()
export class CampaignStatusDao {
  constructor(
    @InjectModel(CampaignStatus)
    private readonly campaignStatusModel: typeof CampaignStatus,
  ) {}

  async getStatusesByCampaignId(campaignId: number): Promise<CampaignStatus[]> {
    return this.campaignStatusModel.findAll({ where: { campaignId } });
  }

  async getStatusesByCompanyId(companyId: number): Promise<CampaignStatus[]> {
    return this.campaignStatusModel.findAll({ where: { companyId } });
  }

  async getAnalyticsByCampaignId(campaignId: number): Promise<CampaignAnalytics> {
    const rows = await this.campaignStatusModel.findAll({
      where: { campaignId },
    });
    return this.aggregate(campaignId, rows);
  }

  async getAnalyticsByCompanyId(companyId: number): Promise<CampaignAnalytics> {
    const rows = await this.campaignStatusModel.findAll({
      where: { companyId },
    });
    return this.aggregate(0, rows, companyId);
  }

  private aggregate(
    campaignId: number,
    rows: CampaignStatus[],
    companyId?: number,
  ): CampaignAnalytics {
    const totalSent = rows.filter(
      (r) => ['sent', 'opened', 'clicked'].includes(r.status),
    ).length;

    const totalOpened = rows.filter(
      (r) => r.openedAt !== null && r.openedAt !== undefined,
    ).length;

    const totalClicked = rows.filter((r) => (r.clicks ?? 0) > 0).length;

    const totalNotReached = rows.filter(
      (r) => r.status === 'bounced' || r.status === 'failed',
    ).length;

    const totalNotOpened = rows.filter(
      (r) =>
        r.status === 'sent' &&
        (r.openedAt === null || r.openedAt === undefined),
    ).length;

    const pct = (num: number, denom: number) =>
      denom === 0 ? '0.00%' : `${((num / denom) * 100).toFixed(2)}%`;

    const totalAttempted = totalSent + totalNotReached;

    return {
      campaignId,
      totalSent,
      totalOpened,
      totalClicked,
      totalNotReached,
      totalNotOpened,
      openRate: pct(totalOpened, totalSent),
      clickRate: pct(totalClicked, totalSent),
      bounceRate: pct(totalNotReached, totalAttempted),
    };
  }
}
