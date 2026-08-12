import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:3000',
    credentials: true,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Ashiful Portfolio API')
    .setDescription(
      'CRUD APIs for the personal portfolio (profile, projects, skills, experience, and more). Use these endpoints to manage seeded website content.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('health', 'API health checks')
    .addTag('auth', 'Login, JWT refresh, and password reset')
    .addTag('portfolio', 'Public read-only portfolio payload')
    .addTag('users', 'Admin user accounts')
    .addTag('profiles', 'Public portfolio profile')
    .addTag('stats', 'Profile stats cards')
    .addTag('projects', 'Selected work / projects')
    .addTag('project-tags', 'Project technology tags')
    .addTag('project-credentials', 'Demo login credentials for projects')
    .addTag('experiences', 'Work experience entries')
    .addTag('experience-highlights', 'Bullet highlights under experience')
    .addTag('services', 'Services offered')
    .addTag('timeline-entries', 'Career / education timeline')
    .addTag('testimonials', 'Client / collaborator testimonials')
    .addTag('contact-links', 'Contact & social links')
    .addTag('skill-groups', 'Skill categories')
    .addTag('skills', 'Individual skills')
    .addTag('skill-details', 'Skill popup knowledge / experience / stats')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'list',
      filter: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
    customSiteTitle: 'Ashiful Portfolio API Docs',
  });

  const port = process.env.PORT ?? 4000;
  await app.listen(port);
  console.log(`API running on http://localhost:${port}/api`);
  console.log(`Swagger UI: http://localhost:${port}/api/docs`);
}
void bootstrap();
