import {
  FileSystemStoredFile,
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from 'nestjs-form-data';

export class ImageDto {
  @IsFile()
  @MaxFileSize(300000)
  @HasMimeType(['image/jpeg', 'image/png'])
  file: FileSystemStoredFile;
}
