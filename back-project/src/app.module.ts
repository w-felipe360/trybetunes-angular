import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { MusicModule } from './music/music.module';
import { AuthModule } from './auth/auth.module';
import { UserMusicModule } from './user-music/user-music.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    MusicModule,
    UserMusicModule,
  ],
})
export class AppModule {}
