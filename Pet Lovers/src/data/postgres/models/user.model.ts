import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { PetPost } from "./pet-post.model";

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}
  

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role!: UserRole;

  @Column('boolean', {
    nullable: false,
    default: true
    })
  status!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @OneToMany(() => PetPost, (petPost) => petPost.user)
  petPosts!: PetPost[];
}
