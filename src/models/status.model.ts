import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
} from 'sequelize-typescript';

@Table({
  tableName: 'campaignStatuses',
  timestamps: true,
})
export class CampaignStatus extends Model<CampaignStatus> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  declare id: number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  declare campaignId: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare email: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare status: string;

  @Column({
    type: DataType.DATE,
  })
  declare sentAt: Date;

  @Column({
    type: DataType.DATE,
  })
  declare openedAt: Date;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  declare clicks: number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  declare emailConfigId: number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  declare companyId: number;

  @Column({
    type: DataType.INTEGER,
  })
  declare createdBy: number;

  @Column({
    type: DataType.INTEGER,
  })
  declare updatedBy: number;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}