import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoriesModule } from './modules/categories/categories.module';
import { OrdersModule } from './modules/orders/orders.module';
import { FilesModule } from './modules/files/files.module';
import typeormconfig from './config/typeormconfig';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [ ConfigModule.forRoot(
    {
      isGlobal: true,
      load:[typeormconfig],
    }
  ) ,TypeOrmModule.forRootAsync(
    {
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('typeorm'),
    }
  ),AuthModule, UsersModule, ProductsModule, CategoriesModule, OrdersModule, FilesModule,JwtModule.register({
    secret: process.env.TOKEN_SECRET,
    signOptions: { expiresIn: '1d' },
    global: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
