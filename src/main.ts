import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // for validation we use the validation pipe
  // whitelist: true makes sure that every single extra property
  // sent to the request will be removed! this is done as a security concern
  const validationPipe = new ValidationPipe({ whitelist: true });
  app.useGlobalPipes(validationPipe);
  await app.listen(3000);
}
bootstrap();
