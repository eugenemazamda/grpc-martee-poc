import { IsEmail, IsNumber, IsString } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'users'})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @IsNumber()
    phone: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @IsString()
    cognito_userId: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
