import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'categories'})
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({ type: 'varchar'})
    public name!: string;

    @Column({ type: 'varchar'})
    public description!: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    /*
    * One-To-Many Relationships
    */ 
}
