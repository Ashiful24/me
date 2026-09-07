import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import { ProfilesService } from './profiles.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AVATARS_DIR, RESUMES_DIR } from '../uploads/upload-paths';

const imageMime = /^image\/(jpeg|jpg|png|webp|gif)$/i;
const resumeMime =
  /^(application\/pdf|application\/msword|application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document)$/i;

function storageFor(destination: string) {
  return diskStorage({
    destination,
    filename: (_req, file, cb) => {
      const ext = extname(file.originalname).toLowerCase() || '';
      cb(null, `${randomUUID()}${ext}`);
    },
  });
}

@ApiTags('profiles')
@ApiBearerAuth()
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly service: ProfilesService) {}

  @Get()
  @ApiOperation({ summary: 'List profiles (optional userId filter)' })
  findAll(@Query('userId') userId?: string) {
    return this.service.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get profile by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update profile' })
  update(@Param('id') id: string, @Body() dto: UpdateProfileDto) {
    return this.service.update(id, dto);
  }

  @Post(':id/avatar')
  @ApiOperation({ summary: 'Upload profile avatar (replaces previous file)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
      required: ['file'],
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: storageFor(AVATARS_DIR),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        if (!imageMime.test(file.mimetype)) {
          return cb(
            new BadRequestException(
              'Avatar must be an image (jpeg, png, webp, gif)',
            ),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  uploadAvatar(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.service.uploadAvatar(id, file);
  }

  @Post(':id/resume')
  @ApiOperation({ summary: 'Upload profile CV/resume (replaces previous file)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
      required: ['file'],
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: storageFor(RESUMES_DIR),
      limits: { fileSize: 10 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        if (!resumeMime.test(file.mimetype)) {
          return cb(
            new BadRequestException('CV must be a PDF or Word document'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  uploadResume(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.service.uploadResume(id, file);
  }
}
