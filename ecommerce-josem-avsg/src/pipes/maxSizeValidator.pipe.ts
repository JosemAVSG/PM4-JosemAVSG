import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()   
export class MaxSizeValidatorPipe implements PipeTransform {
    transform(value: any, metadata: any): any {
        if (value.size > 200000) {
            throw new BadRequestException('Archivo no puede superar los 200KB');
        }
        return value;
    }
}