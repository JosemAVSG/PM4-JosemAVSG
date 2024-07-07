import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {

     constructor(private readonly jwtService: JwtService) {}

    private readonly excludedRoutes :{path:string, method:string}[] = [
        {path:'/users', method: 'POST'},
        {path:'/orders', method: 'GET'},
        {path:'/products', method: 'GET'},
        {path:'/products/:id', method: 'GET'},
    ];
    private isExcluded(url: string, method: string): boolean {
        return this.excludedRoutes.some(route => {
            const regex = new RegExp(`^${route.path.replace(/:id/g, '[^/]+')}$`);
            return regex.test(url) && route.method === method;
        });
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        
        const {url, method} = request;
        if(this.isExcluded(url, method)){
            return true
        }
        if(!request.headers['authorization']){
            throw new UnauthorizedException('Token not provided');}

        const Authorization = request.headers['authorization'].split(' ')[1];
    
         if(!Authorization){
        throw new UnauthorizedException('Token not provided');
         }
         try {
        const sercret = process.env.TOKEN_SECRET;
        const payload =  this.jwtService.verify(Authorization, { secret: sercret });
        payload.exp = new Date(payload.exp * 1000);
        payload.iat = new Date(payload.iat * 1000);
        request.user = payload;
        
        return true;
        
          } catch (error) {
        throw new UnauthorizedException('Invalid token');
         }
    }
}