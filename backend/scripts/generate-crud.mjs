/**
 * One-shot generator for NestJS CRUD modules.
 * Run: node scripts/generate-crud.mjs
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve("src");

const resources = [
  {
    folder: "users",
    name: "User",
    route: "users",
    prisma: "user",
    createFields: [
      ["email", "string", true],
      ["password", "string", true],
      ["username", "string", true],
      ["phoneNumber", "string", false],
      ["role", "enum", false, "Role", "ADMIN"],
      ["status", "enum", false, "UserStatus", "ACTIVE"],
      ["createdBy", "string", false],
      ["updatedBy", "string", false],
    ],
    updateOmit: [],
    hashPassword: true,
    include: undefined,
  },
  {
    folder: "profiles",
    name: "Profile",
    route: "profiles",
    prisma: "profile",
    createFields: [
      ["userId", "string", true],
      ["name", "string", true],
      ["title", "string", true],
      ["bio", "string", true],
      ["location", "string", true],
      ["status", "string", true],
      ["avatarUrl", "string", true],
      ["linkedInUrl", "string", true],
      ["resumeUrl", "string", true],
      ["siteUrl", "string", true],
      ["siteTitle", "string", true],
      ["siteDescription", "string", true],
      ["roles", "string[]", true],
      ["createdBy", "string", false],
      ["updatedBy", "string", false],
    ],
  },
  {
    folder: "stats",
    name: "Stat",
    route: "stats",
    prisma: "stat",
    createFields: [
      ["userId", "string", true],
      ["value", "string", true],
      ["label", "string", true],
      ["sortOrder", "number", false],
      ["createdBy", "string", false],
      ["updatedBy", "string", false],
    ],
  },
  {
    folder: "projects",
    name: "Project",
    route: "projects",
    prisma: "project",
    createFields: [
      ["userId", "string", true],
      ["file", "string", true],
      ["title", "string", true],
      ["description", "string", true],
      ["github", "string", false],
      ["live", "string", false],
      ["sortOrder", "number", false],
      ["createdBy", "string", false],
      ["updatedBy", "string", false],
    ],
    include: "{ tags: true, credentials: true }",
  },
  {
    folder: "project-tags",
    name: "ProjectTag",
    route: "project-tags",
    prisma: "projectTag",
    createFields: [
      ["userId", "string", true],
      ["projectId", "string", true],
      ["name", "string", true],
      ["createdBy", "string", false],
      ["updatedBy", "string", false],
    ],
  },
  {
    folder: "project-credentials",
    name: "ProjectCredential",
    route: "project-credentials",
    prisma: "projectCredential",
    createFields: [
      ["userId", "string", true],
      ["projectId", "string", true],
      ["label", "string", true],
      ["value", "string", true],
      ["createdBy", "string", false],
      ["updatedBy", "string", false],
    ],
  },
  {
    folder: "experiences",
    name: "Experience",
    route: "experiences",
    prisma: "experience",
    createFields: [
      ["userId", "string", true],
      ["title", "string", true],
      ["subtitle", "string", true],
      ["sortOrder", "number", false],
      ["createdBy", "string", false],
      ["updatedBy", "string", false],
    ],
    include: "{ highlights: { orderBy: { sortOrder: 'asc' } } }",
  },
  {
    folder: "experience-highlights",
    name: "ExperienceHighlight",
    route: "experience-highlights",
    prisma: "experienceHighlight",
    createFields: [
      ["userId", "string", true],
      ["experienceId", "string", true],
      ["text", "string", true],
      ["sortOrder", "number", false],
      ["createdBy", "string", false],
      ["updatedBy", "string", false],
    ],
  },
  {
    folder: "services",
    name: "Service",
    route: "services",
    prisma: "service",
    createFields: [
      ["userId", "string", true],
      ["description", "string", true],
      ["sortOrder", "number", false],
      ["createdBy", "string", false],
      ["updatedBy", "string", false],
    ],
  },
  {
    folder: "timeline-entries",
    name: "TimelineEntry",
    route: "timeline-entries",
    prisma: "timelineEntry",
    createFields: [
      ["userId", "string", true],
      ["year", "string", true],
      ["title", "string", true],
      ["text", "string", true],
      ["sortOrder", "number", false],
      ["createdBy", "string", false],
      ["updatedBy", "string", false],
    ],
  },
  {
    folder: "testimonials",
    name: "Testimonial",
    route: "testimonials",
    prisma: "testimonial",
    createFields: [
      ["userId", "string", true],
      ["quote", "string", true],
      ["name", "string", true],
      ["role", "string", true],
      ["sortOrder", "number", false],
      ["createdBy", "string", false],
      ["updatedBy", "string", false],
    ],
  },
  {
    folder: "contact-links",
    name: "ContactLink",
    route: "contact-links",
    prisma: "contactLink",
    createFields: [
      ["userId", "string", true],
      ["label", "string", true],
      ["value", "string", true],
      ["href", "string", true],
      ["iconKey", "string", true],
      ["color", "string", true],
      ["sortOrder", "number", false],
      ["createdBy", "string", false],
      ["updatedBy", "string", false],
    ],
  },
  {
    folder: "skill-groups",
    name: "SkillGroup",
    route: "skill-groups",
    prisma: "skillGroup",
    createFields: [
      ["userId", "string", true],
      ["title", "string", true],
      ["sortOrder", "number", false],
      ["createdBy", "string", false],
      ["updatedBy", "string", false],
    ],
    include:
      "{ skills: { orderBy: { sortOrder: 'asc' }, include: { detail: true } } }",
  },
  {
    folder: "skills",
    name: "Skill",
    route: "skills",
    prisma: "skill",
    createFields: [
      ["userId", "string", true],
      ["parentId", "string", true],
      ["title", "string", true],
      ["iconKey", "string", true],
      ["color", "string", true],
      ["sortOrder", "number", false],
      ["createdBy", "string", false],
      ["updatedBy", "string", false],
    ],
    include: "{ detail: true, parent: true }",
  },
  {
    folder: "skill-details",
    name: "SkillDetail",
    route: "skill-details",
    prisma: "skillDetail",
    createFields: [
      ["userId", "string", true],
      ["skillId", "string", true],
      ["knowledge", "string", true],
      ["experience", "string", true],
      ["stats", "string", true],
      ["createdBy", "string", false],
      ["updatedBy", "string", false],
    ],
  },
];

function fieldDecorators(type, required, enumName, defaultVal) {
  const lines = [];
  if (!required) lines.push("@IsOptional()");
  if (type === "string") {
    lines.push(required ? "@IsString()" : "@IsString()");
    if (required) lines.push("@IsNotEmpty()");
  } else if (type === "number") {
    lines.push("@Type(() => Number)");
    lines.push("@IsInt()");
  } else if (type === "string[]") {
    lines.push("@IsArray()");
    lines.push("@IsString({ each: true })");
  } else if (type === "enum") {
    lines.push(`@IsEnum(${enumName})`);
  }
  return lines;
}

function tsType(type, enumName) {
  if (type === "string") return "string";
  if (type === "number") return "number";
  if (type === "string[]") return "string[]";
  if (type === "enum") return enumName;
  return "any";
}

function generateDto(resource) {
  const enumImports = new Set();
  for (const f of resource.createFields) {
    if (f[1] === "enum") enumImports.add(f[3]);
  }

  let imports = `import { IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';\nimport { Type } from 'class-transformer';\n`;
  if (enumImports.size) {
    imports += `import { ${[...enumImports].join(", ")} } from '../../generated/prisma/client';\n`;
  }

  // Fix path - DTOs are in src/resource/dto, generated is at backend/generated
  imports = `import { IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';\nimport { Type } from 'class-transformer';\n`;
  if (enumImports.size) {
    imports += `import { ${[...enumImports].join(", ")} } from '../../../generated/prisma/client';\n`;
  }

  let createBody = `${imports}\nexport class Create${resource.name}Dto {\n`;
  for (const f of resource.createFields) {
    const [name, type, required, enumName, defaultVal] = f;
    const decs = fieldDecorators(type, required, enumName, defaultVal);
    createBody += decs.map((d) => `  ${d}\n`).join("");
    if (type === "enum" && defaultVal) {
      createBody += `  ${name}?: ${enumName};\n\n`;
    } else if (!required) {
      createBody += `  ${name}?: ${tsType(type, enumName)};\n\n`;
    } else {
      createBody += `  ${name}: ${tsType(type, enumName)};\n\n`;
    }
  }
  createBody += "}\n";

  const updateBody = `import { PartialType } from '@nestjs/mapped-types';\nimport { Create${resource.name}Dto } from './create-${resource.folder.replace(/s$/, "")}.dto';\n\nexport class Update${resource.name}Dto extends PartialType(Create${resource.name}Dto) {}\n`;

  // Fix create DTO filename - use kebab of name
  const createFileName = `create-${toKebab(resource.name)}.dto`;
  const updateFileName = `update-${toKebab(resource.name)}.dto`;

  return {
    createFileName,
    updateFileName,
    createBody,
    updateBody: `import { PartialType } from '@nestjs/mapped-types';\nimport { Create${resource.name}Dto } from './${createFileName}';\n\nexport class Update${resource.name}Dto extends PartialType(Create${resource.name}Dto) {}\n`,
  };
}

function toKebab(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

function generateService(resource) {
  const include = resource.include
    ? `include: ${resource.include},`
    : "";
  const orderBy = resource.createFields.some((f) => f[0] === "sortOrder")
    ? "orderBy: { sortOrder: 'asc' },"
    : "orderBy: { createdAt: 'desc' },";

  let hashImport = "";
  let createLogic = `return this.prisma.${resource.prisma}.create({ data: dto, ${include} });`;
  let updateLogic = `return this.prisma.${resource.prisma}.update({ where: { id }, data: dto, ${include} });`;

  if (resource.hashPassword) {
    hashImport = `import { hash } from 'bcryptjs';\n`;
    createLogic = `const data = { ...dto };
    if (data.password) {
      data.password = await hash(data.password, 10);
    }
    return this.prisma.${resource.prisma}.create({ data, ${include} });`;
    updateLogic = `const data = { ...dto };
    if (data.password) {
      data.password = await hash(data.password, 10);
    }
    return this.prisma.${resource.prisma}.update({ where: { id }, data, ${include} });`;
  }

  return `${hashImport}import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Create${resource.name}Dto } from './dto/create-${toKebab(resource.name)}.dto';
import { Update${resource.name}Dto } from './dto/update-${toKebab(resource.name)}.dto';

@Injectable()
export class ${resource.name}sService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: Create${resource.name}Dto) {
    ${createLogic}
  }

  async findAll(userId?: string) {
    return this.prisma.${resource.prisma}.findMany({
      where: userId ? { userId } : undefined,
      ${orderBy}
      ${include}
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.${resource.prisma}.findUnique({
      where: { id },
      ${include}
    });
    if (!item) {
      throw new NotFoundException(\`${resource.name} \${id} not found\`);
    }
    return item;
  }

  async update(id: string, dto: Update${resource.name}Dto) {
    await this.findOne(id);
    ${updateLogic}
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.${resource.prisma}.delete({ where: { id } });
  }
}
`.replace(
    /where: userId \? \{ userId \} : undefined,/g,
    resource.prisma === "user"
      ? "where: undefined,"
      : "where: userId ? { userId } : undefined,"
  );
}

function generateController(resource) {
  const hasUserId = resource.createFields.some((f) => f[0] === "userId");
  const queryUser =
    hasUserId
      ? `@Query('userId') userId?: string`
      : "";
  const findAllCall = hasUserId
    ? `return this.service.findAll(userId);`
    : `return this.service.findAll();`;

  return `import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ${resource.name}sService } from './${resource.folder}.service';
import { Create${resource.name}Dto } from './dto/create-${toKebab(resource.name)}.dto';
import { Update${resource.name}Dto } from './dto/update-${toKebab(resource.name)}.dto';

@Controller('${resource.route}')
export class ${resource.name}sController {
  constructor(private readonly service: ${resource.name}sService) {}

  @Post()
  create(@Body() dto: Create${resource.name}Dto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(${queryUser}) {
    ${findAllCall}
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Update${resource.name}Dto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
`;
}

function generateModule(resource) {
  return `import { Module } from '@nestjs/common';
import { ${resource.name}sController } from './${resource.folder}.controller';
import { ${resource.name}sService } from './${resource.folder}.service';

@Module({
  controllers: [${resource.name}sController],
  providers: [${resource.name}sService],
  exports: [${resource.name}sService],
})
export class ${resource.name}sModule {}
`;
}

// Fix User service - no userId filter, and class name should be UsersService not UsersService from User+s
// For names ending in y etc - we're using ${name}s which for User -> Users, for Service -> Services (ok), TimelineEntry -> TimelineEntrys (bad)

function pluralClass(name) {
  if (name === "User") return "Users";
  if (name === "ExperienceHighlight") return "ExperienceHighlights";
  if (name === "TimelineEntry") return "TimelineEntries";
  if (name === "ProjectTag") return "ProjectTags";
  if (name === "ProjectCredential") return "ProjectCredentials";
  if (name === "ContactLink") return "ContactLinks";
  if (name === "SkillGroup") return "SkillGroups";
  if (name === "SkillDetail") return "SkillDetails";
  if (name === "Service") return "Services";
  if (name.endsWith("y") && !/[aeiou]y$/i.test(name)) {
    return name.slice(0, -1) + "ies";
  }
  if (name.endsWith("s")) return name + "es";
  return name + "s";
}

// Regenerate with proper plural names
for (const resource of resources) {
  resource.classPlural = pluralClass(resource.name);
}

function generateServiceFixed(resource) {
  const P = resource.classPlural;
  const include = resource.include
    ? `include: ${resource.include},`
    : "";
  const orderBy = resource.createFields.some((f) => f[0] === "sortOrder")
    ? "orderBy: { sortOrder: 'asc' as const },"
    : "orderBy: { createdAt: 'desc' as const },";

  let hashImport = "";
  let createLogic = `return this.prisma.${resource.prisma}.create({ data: dto${resource.include ? `, include: ${resource.include}` : ""} });`;
  let updateLogic = `return this.prisma.${resource.prisma}.update({ where: { id }, data: dto${resource.include ? `, include: ${resource.include}` : ""} });`;

  if (resource.hashPassword) {
    hashImport = `import { hash } from 'bcryptjs';\n`;
    createLogic = `const data = { ...dto };
    if (data.password) {
      data.password = await hash(data.password, 10);
    }
    return this.prisma.${resource.prisma}.create({ data });`;
    updateLogic = `const data = { ...dto };
    if (data.password) {
      data.password = await hash(data.password, 10);
    }
    return this.prisma.${resource.prisma}.update({ where: { id }, data });`;
  }

  const findAllWhere =
    resource.prisma === "user"
      ? ""
      : `where: userId ? { userId } : undefined,`;

  const findAllSig =
    resource.prisma === "user" ? `async findAll()` : `async findAll(userId?: string)`;

  return `${hashImport}import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Create${resource.name}Dto } from './dto/create-${toKebab(resource.name)}.dto';
import { Update${resource.name}Dto } from './dto/update-${toKebab(resource.name)}.dto';

@Injectable()
export class ${P}Service {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: Create${resource.name}Dto) {
    ${createLogic}
  }

  ${findAllSig} {
    return this.prisma.${resource.prisma}.findMany({
      ${findAllWhere}
      ${orderBy}
      ${include}
    });
  }

  async findOne(id: string) {
    const item = await this.prisma.${resource.prisma}.findUnique({
      where: { id },
      ${include}
    });
    if (!item) {
      throw new NotFoundException(\`${resource.name} \${id} not found\`);
    }
    return item;
  }

  async update(id: string, dto: Update${resource.name}Dto) {
    await this.findOne(id);
    ${updateLogic}
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.${resource.prisma}.delete({ where: { id } });
  }
}
`;
}

function generateControllerFixed(resource) {
  const P = resource.classPlural;
  const hasUserId = resource.prisma !== "user";
  const queryUser = hasUserId ? `@Query('userId') userId?: string` : "";
  const findAllCall = hasUserId
    ? `return this.service.findAll(userId);`
    : `return this.service.findAll();`;

  return `import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ${P}Service } from './${resource.folder}.service';
import { Create${resource.name}Dto } from './dto/create-${toKebab(resource.name)}.dto';
import { Update${resource.name}Dto } from './dto/update-${toKebab(resource.name)}.dto';

@Controller('${resource.route}')
export class ${P}Controller {
  constructor(private readonly service: ${P}Service) {}

  @Post()
  create(@Body() dto: Create${resource.name}Dto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(${queryUser}) {
    ${findAllCall}
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Update${resource.name}Dto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
`;
}

function generateModuleFixed(resource) {
  const P = resource.classPlural;
  return `import { Module } from '@nestjs/common';
import { ${P}Controller } from './${resource.folder}.controller';
import { ${P}Service } from './${resource.folder}.service';

@Module({
  controllers: [${P}Controller],
  providers: [${P}Service],
  exports: [${P}Service],
})
export class ${P}Module {}
`;
}

const moduleImports = [];
const moduleList = [];

for (const resource of resources) {
  const dir = path.join(root, resource.folder);
  const dtoDir = path.join(dir, "dto");
  fs.mkdirSync(dtoDir, { recursive: true });

  const dto = generateDto(resource);
  fs.writeFileSync(path.join(dtoDir, `${dto.createFileName}.ts`), dto.createBody);
  fs.writeFileSync(path.join(dtoDir, `${dto.updateFileName}.ts`), dto.updateBody);
  fs.writeFileSync(
    path.join(dir, `${resource.folder}.service.ts`),
    generateServiceFixed(resource),
  );
  fs.writeFileSync(
    path.join(dir, `${resource.folder}.controller.ts`),
    generateControllerFixed(resource),
  );
  fs.writeFileSync(
    path.join(dir, `${resource.folder}.module.ts`),
    generateModuleFixed(resource),
  );

  moduleImports.push(
    `import { ${resource.classPlural}Module } from './${resource.folder}/${resource.folder}.module';`,
  );
  moduleList.push(`${resource.classPlural}Module`);
  console.log(`Generated ${resource.folder}`);
}

const appModule = `import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
${moduleImports.join("\n")}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    ${moduleList.join(",\n    ")},
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
`;

fs.writeFileSync(path.join(root, "app.module.ts"), appModule);
console.log("Updated app.module.ts");
