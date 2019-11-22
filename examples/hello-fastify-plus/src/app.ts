import { FastifyPlusApplication } from 'fastify-plus';

async function bootstrap() {
  const app = await FastifyPlusApplication.create({
    appRootPath: __dirname,
  });
  await app.start(3000);
}

bootstrap();
