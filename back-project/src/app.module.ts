import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { MusicModule } from './music/music.module';

@Module({
  imports: [DatabaseModule, UsersModule, MusicModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
