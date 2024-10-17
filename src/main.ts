import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const seedService = app.get(SeedService);
  await seedService.seed();

  await app.listen(envs.port);
}
bootstrap();
