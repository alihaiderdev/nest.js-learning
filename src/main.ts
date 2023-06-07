import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// to start dist folder mean build code cd to dist folder and run node main.js command in your terminal
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  // by default nest js internally used express.js but if you want to use fastify then we have to make this little bit changes
  // const app = await NestFactory.create(AppModule, new FastifyAdapter());

  // and fastify be default localhost ka lia listen karta hai lakin agar hamain kisi or ip or domain ka lia listen karwana hai to hamain app.listen ma port ka bad mention karna parega
  // await app.listen(3000, '0.0.0.0');
}
bootstrap();
