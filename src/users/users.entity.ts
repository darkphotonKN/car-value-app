import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { Exclude } from 'class-transformer';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  // NestJS docs recommended way, but ill build a custom method that
  // will prove to be more flexible
  // @Exclude() // everytime we create an instance of a user from the entity
  // // and turn it into an object then into JSON, EXCLUDE the password
  password: string;

  @AfterInsert()
  logAfterInsert() {
    console.log('Inserted entry to DB with email:', this.email);
  }

  @AfterUpdate()
  logAfterUpdate() {
    console.log('Inserted entry to DB with email:', this.email);
  }

  @AfterRemove()
  logAfterRemove() {
    console.log('Inserted entry to DB with email:', this.email);
  }
}
