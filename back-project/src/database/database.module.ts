import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        // Adicione os logs aqui
        console.log(configService.getOrThrow('MYSQL_HOST'));
        console.log(configService.getOrThrow('MYSQL_PORT'));
        console.log(configService.getOrThrow('MYSQL_DATABASE'));
        console.log(configService.getOrThrow('MYSQL_USERNAME'));
        console.log(configService.getOrThrow('MYSQL_PASSWORD'));

        return {
          type: 'mysql',
          host: configService.get('MYSQL_HOST'),
          port: configService.get('MYSQL_PORT'),
          database: configService.get('MYSQL_DATABASE'),
          username: configService.get('MYSQL_USERNAME'),
          password: configService.get('MYSQL_PASSWORD'),
          autoLoadEntities: true,
          synchronize: configService.get('MYSQL_SYNCHRONIZE'),
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
