import { FastifyPlusApplication } from '@fastify-plus/core';
import { DocumentBuilder } from '../lib';

async function bootstrap() {
  const app = await FastifyPlusApplication.create({ appRootPath: __dirname });
  DocumentBuilder.create(app)
    .setInfo({
      title: 'test',
      description: 'test',
      version: '0.0.1',
    })
    .setBasePath('/api')
    .build();
  await app.start(3000);
}

bootstrap();
