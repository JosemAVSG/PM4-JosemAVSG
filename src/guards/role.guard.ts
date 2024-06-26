import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Roles } from '../interfaces/roles.enum';
@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector:Reflector) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
       
       const requiredRoles = this.reflector.getAllAndOverride<Roles[]>('roles', [
           context.getHandler(),
           context.getClass(),
       ]);
       
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const hasRole = () => requiredRoles.some((role) => user.roles.includes(role));
        const isvalid = user && user.roles && hasRole();
        if(!isvalid) {
            throw new ForbiddenException('You do not have permission to access this resource');
        }
        return isvalid;
    }
}