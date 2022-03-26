import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Pet } from 'src/pets/pet.entity';

@Entity()
@ObjectType()
export class Owner {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @OneToMany(() => Pet, pet => pet.owner)
  @Field(() => [Pet], { nullable: true })
  pets?: Pet[];
}
