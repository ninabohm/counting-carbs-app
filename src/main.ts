import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { FirebaseAuthGuard } from './firebase/firebase-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new FirebaseAuthGuard(new Reflector()));
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
