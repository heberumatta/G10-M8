import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Prefijo global de API
  const apiPrefix = process.env.API_PREFIX || 'api/v1';
  app.setGlobalPrefix(apiPrefix);

  // Habilitar CORS para el Dashboard frontend
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Validaciones globales de DTOs con class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Documentación Interactiva Swagger / OpenAPI (RNF-03)
  const config = new DocumentBuilder()
    .setTitle('Módulo 8: Notificaciones, Documentos y Soporte (G10-M8)')
    .setDescription(
      'API REST oficial del Módulo 8 para la Plataforma Distribuida de Movilidad Urbana (Desarrollo de Software 2026).',
    )
    .setVersion('1.0.0')
    .addTag('Health', 'Estado y diagnóstico del servicio')
    .addTag('Notificaciones', 'Envío y tracking de notificaciones de viajes y reservas (RF-8.1, RF-8.2, RF-8.6)')
    .addTag('Documentos y QR', 'Generación de QR y comprobantes PDF (RF-8.3, RF-8.4, RF-8.5)')
    .addTag('Soporte y Tickets', 'Gestión de reclamos y tickets de asistencia (RF-8.7)')
    .addTag('Simulador de Eventos', 'Emulación de eventos de M5, M6, M7 y M9 para pruebas locales')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`🚀 M8 Backend ejecutándose en: http://localhost:${port}/${apiPrefix}`);
  logger.log(`📖 Documentación Swagger UI disponible en: http://localhost:${port}/api/docs`);
}

bootstrap();
