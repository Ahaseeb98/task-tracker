import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FileUploadModule } from './shared/file-upload/file-upload.module';
import { join } from 'path';
console.log(join(__dirname, '..', 'uploads'));
@Module({
  imports: [AuthModule, FileUploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
