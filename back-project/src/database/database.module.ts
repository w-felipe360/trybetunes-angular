import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('MYSQL_HOST') || 'mysql',
          port: configService.get('MYSQL_PORT'),
          database: configService.get('MYSQL_DATABASE'),
          username: configService.get('MYSQL_USERNAME'),
          password: configService.get('MYSQL_ROOT_PASSWORD'),
          autoLoadEntities: true,
          synchronize: configService.get('MYSQL_SYNCHRONIZE'),
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
