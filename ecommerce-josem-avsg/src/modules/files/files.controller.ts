import { Controller, Post, Res, Param, ParseUUIDPipe, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UseGuards } from '@nestjs/common';
import { FilesService } from './files.service';
import { CloudinaryService } from './cloudinary.service';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../../guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Files')
@Controller('files')
export class FilesController {

    constructor( private readonly filesService: FilesService, private readonly cloudinaryService: CloudinaryService ) {}

    // async uploadFile(file: Express.Multer.File) {
       
    // }

    @Post('uploadImage/:id')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    async uploadImage(@UploadedFile(
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({ maxSize: 200000, message: 'Max file size is 200kb' }),
                new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/})
            ]
        })
    ) file: Express.Multer.File, @Res() res: Response, @Param('id', ParseUUIDPipe) id: string) {
        console.log(file);
        
        const result = await this.cloudinaryService.uploadImage(file);
        const { url } = result;
        console.log(url, 'resultado', result);
        
        
        const product = await this.filesService.uploadProductImage(id, url);
        return res.status(200).json({product});
    }



}
