import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// la magia está en que una entidad sirve tambien como ObjectType para construir una query
// usando los decoradores correspondientes, una clase puede ser tanto una entidad (tabla) en bdd como un ObjectType(para GraphQL)

@Entity()
@ObjectType()
export class Pet {
    @PrimaryGeneratedColumn('increment')
    @Field(type => Int)
    id: number;

    @Column()
    @Field()
    name: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    type?: string;
}