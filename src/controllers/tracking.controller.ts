import { Controller, Get, Param, Query, Res, Logger } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Email Tracking')
@Controller('track')
export class TrackingController {
  private readonly logger = new Logger(TrackingController.name);

  @ApiOperation({ summary: 'Open-tracking pixel (public)' })
  @Get('open/:token')
  async trackOpen(
    @Param('token') token: string,
    @Res() res: Response,
  ): Promise<void> {
    this.logger.log(`Open tracked for token: ${token}`);

    const pixel = Buffer.from(
      'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      'base64',
    );

    res.setHeader('Content-Type', 'image/gif');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.end(pixel);
  }

  @ApiOperation({ summary: 'Click-tracking redirect (public)' })
  @Get('click/:token')
  async trackClick(
    @Param('token') token: string,
    @Query('url') url: string,
    @Res() res: Response,
  ): Promise<void> {
    this.logger.log(`Click tracked for token: ${token}, url: ${url}`);

    if (!url) {
      res.status(400).send('Missing url parameter');
      return;
    }

    res.redirect(302, decodeURIComponent(url));
  }
}
