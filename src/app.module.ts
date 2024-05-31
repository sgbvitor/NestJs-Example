import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './User/users.module';
import { User } from './User/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'oracle',
      host: process.env.HOST_NAME || 'localhost',
      port: Number(process.env.PORT || 3306),
      username: process.env.USERNAME || 'root',
      password: process.env.PASSWORD || 'root',
      database: process.env.DATABASE || 'nest',
      entities: [User],
      //synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}
