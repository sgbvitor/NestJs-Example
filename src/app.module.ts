import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './User/users.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule],
})
export class AppModule {}
