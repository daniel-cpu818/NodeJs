import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.model";

@Entity()
export class PetPost {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  pet_name!: string;

  @Column("text")
  description!: string;

  @Column()
  image_url!: string;

  @Column({
    type: "enum",
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  })
  status!: "pending" | "approved" | "rejected";

  @Column({ default: false })
  hasFounded!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @ManyToOne(() => User, (user) => user.petPosts, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user!: User;
}
