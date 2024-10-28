import { Controller, Post, UseInterceptors, UploadedFile, Delete, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';
import { Express } from 'express';
import { join } from 'path';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './doc',
        filename: (req, file, cb) => {
          const fileName = file.originalname;
          cb(null, fileName);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // Ліміт на 5MB
      fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (allowedTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error('Недопустимий формат файлу'), false);
        }
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.filesService.handleFileUpload(file);
  }

  @Delete('delete/:filename')
  async deleteFile(@Param('filename') filename: string) {
    return this.filesService.deleteFile(filename);
  }
}
