import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { CategorySeedService } from './modules/categories/categoriesSeed.service';
import { ProductSeedService } from './modules/products/productsSeed.service';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(new LoggerMiddleware().use);
  app.enableCors({
    origin: '*', // Permitir todas las solicitudes de origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept',
  });
  const seedServiceCategory = app.get(CategorySeedService);
  await seedServiceCategory.seed();

  const seedServiceProduct = app.get(ProductSeedService);
  await seedServiceProduct.seed();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const swaggerConfig = new DocumentBuilder()
  .setTitle('Ecommerce API')
  .setVersion('1.0')
  .setDescription('Ecommerce API Documentation for developers')
  .addBearerAuth()
  .build();
    
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
