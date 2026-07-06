import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';
import { HealthModule } from './modules/health.module';
import { TemplatesModule } from './modules/templates/templates.module';
import { SharedModule } from './shared/shared.module';
import { getDatabaseConfig } from './config/sqldb.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),
    LoggerModule, 
    HealthModule, 
    TemplatesModule,
    SharedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
