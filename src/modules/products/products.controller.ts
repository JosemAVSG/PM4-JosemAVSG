import { Controller, Get, Post, Put, Delete, Res, Param, Body, Query, UseGuards, ParseUUIDPipe, HttpException, HttpStatus} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Response} from 'express';
import { Products } from './products.entity';
import { AuthGuard } from '../../guards/auth.guard';
import { CreateProductDto } from '../../interfaces/dtos/createProduct.dto';
import { RoleGuard } from '../../guards/role.guard';
import { Role } from '../../decorators/roles.decorator';
import { Roles } from '../../interfaces/roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {

    constructor(private productsService: ProductsService){}
    @Get()
   async getProducts(@Res() res: Response, @Query('page') page: number = 1, @Query('limit') limit: number = 5) {

        const pageNumber = Number(page) || 1;
        const limitNumber = Number(limit) || 5;
        try {
            const products = await this.productsService.getProducts(pageNumber, limitNumber);
            res.status(200).json(products);
            
        }catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Products not found !'+ error,
            }, HttpStatus.NOT_FOUND);
        }
    }   

    @Get(':id')
     async getProduct( @Res () res: Response, @Param('id', ParseUUIDPipe) id: string) {

        try {
            
            const product = await this.productsService.getProduct(id);
            res.status(200).json(product);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Product not found !'+ error,
            }, HttpStatus.NOT_FOUND);
        }
    }
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('category/:id')
    async getProductsByCategory( @Res () res: Response, @Param('id', ParseUUIDPipe) id: string) {
        const products = await this.productsService.getProductbyCategoryId(id);
        res.status(200).json(products);
    }
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post()
    async createProduct( @Res() res: Response, @Body() product:CreateProductDto) {
        try {
            const newProduct = await this.productsService.createProduct(product);
            res.status(201).json(newProduct);
        } catch (error) {
             throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
              }, HttpStatus.BAD_REQUEST);  
        }

    }
    @ApiBearerAuth()
    
    @Put(':id')
    @Role(Roles.ADMIN)
    @UseGuards(AuthGuard, RoleGuard)
    async updateProduct( @Param('id', ParseUUIDPipe) id: string, @Res() res: Response, @Body() product: Products) {


        try {
            const updateProduct =  await this.productsService.updateProduct(id, product);
            res.status(200).json(updateProduct);
            
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'product not Updated !'+ error,
            }, HttpStatus.BAD_REQUEST);
        }
    }
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteProduct(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {


        try {
            const deleteProduct = await this.productsService.deleteProduct(id);
            res.status(200).json(deleteProduct);
            
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'product not Deleted !'+ error,
            }, HttpStatus.BAD_REQUEST);
        }
    }
}
