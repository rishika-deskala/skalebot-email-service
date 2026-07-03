import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';
import { HealthModule } from './modules/health.module';
import { TemplatesModule } from './modules/templates/templates.module';

@Module({
  imports: [LoggerModule, HealthModule, TemplatesModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
