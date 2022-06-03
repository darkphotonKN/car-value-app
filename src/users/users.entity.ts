import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column()
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
