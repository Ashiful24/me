import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { StatsModule } from './stats/stats.module';
import { ProjectsModule } from './projects/projects.module';
import { ProjectTagsModule } from './project-tags/project-tags.module';
import { ProjectCredentialsModule } from './project-credentials/project-credentials.module';
import { ExperiencesModule } from './experiences/experiences.module';
import { ExperienceHighlightsModule } from './experience-highlights/experience-highlights.module';
import { ServicesModule } from './services/services.module';
import { TimelineEntriesModule } from './timeline-entries/timeline-entries.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { ContactLinksModule } from './contact-links/contact-links.module';
import { SkillGroupsModule } from './skill-groups/skill-groups.module';
import { SkillsModule } from './skills/skills.module';
import { SkillDetailsModule } from './skill-details/skill-details.module';
import { PortfolioModule } from './portfolio/portfolio.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    ProfilesModule,
    StatsModule,
    ProjectsModule,
    ProjectTagsModule,
    ProjectCredentialsModule,
    ExperiencesModule,
    ExperienceHighlightsModule,
    ServicesModule,
    TimelineEntriesModule,
    TestimonialsModule,
    ContactLinksModule,
    SkillGroupsModule,
    SkillsModule,
    SkillDetailsModule,
    PortfolioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
