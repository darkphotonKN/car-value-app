import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // for validation we use the validation pipe
  const validationPipe = new ValidationPipe({ whitelist: true });
  app.useGlobalPipes(validationPipe);
  await app.listen(3000);
}
bootstrap();
