import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log(' Conectado exitosamente a PostgreSQL (Local/Supabase)');
    } catch (error) {
      this.logger.warn(
        `⚠ No se pudo conectar a la base de datos inmediatamente: ${error.message}. Verifique DATABASE_URL.`,
      );
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
