import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';


//import { UserModule } from './user/user.module';
import { dirname } from 'path';
import { UsersModule } from './users/users.module';
import { HousingModule } from './housing/housing.module';
import { BillsModule } from './bills/bills.module';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    TypeOrmModule.forRoot({
      type:'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      synchronize: false,
      logging: false,
      //migrations:[__dirname + 'database/migrations/*{.js,.ts}'],
      entities:[__dirname + '/**/*.entity{.js,.ts}'],
    }), UsersModule, HousingModule, BillsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
