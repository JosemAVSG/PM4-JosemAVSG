import { SetMetadata } from "@nestjs/common";
import { Roles } from '../interfaces/roles.enum';

export const Role = (...roles: Roles[]) => SetMetadata('roles', roles)