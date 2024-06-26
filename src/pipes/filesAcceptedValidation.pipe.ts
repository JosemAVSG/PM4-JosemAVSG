import { Injectable, PipeTransform, BadRequestException, FileTypeValidator } from "@nestjs/common";

@Injectable()
export class FilesAcceptedValidationPipe implements PipeTransform {

    transform(value: any, metadata: any): any {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
        if (!allowedTypes.includes(value.mimetype)) {
            throw new BadRequestException('Invalid file type. Only JPEG, JPG,PNG and WEBP are allowed.');
        }
        return value;
    }
}