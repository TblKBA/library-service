import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
      .setTitle('Сервис "Библиотека" ~ Проектирование веб-вервисов ~ Оспанов С.А. (171-331)')
      .setDescription('Документация к сервису "Библиотека"')
      .setVersion('1.0')
      .addTag('readers')
      .addTag('giveOut')
      .addTag('books')
      .addTag('logs')
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();