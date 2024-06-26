import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Files {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    path: string;

    @Column()
    mimetype: string;

    @Column({type:'bytea'})
    data: Buffer;
    
}