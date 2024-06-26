import { DataSource, DataSourceOptions } from 'typeorm';
import {config as dotenvConfig} from 'dotenv';
import { registerAs } from '@nestjs/config';

dotenvConfig( { path: '.env' } );

const typeOrmConfig= {
    type: 'postgres',
    host: process.env.DB_HOST,
    port:  process.env.DB_PORT as unknown as number,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    autoLoadEntities: true,
    logging: ['error'],
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations:['dist/migrations/*{.ts,.js}'],
    // dropSchema: true
}
export default registerAs('typeorm', () => typeOrmConfig);
export const conectionSource = new DataSource(typeOrmConfig as DataSourceOptions);