import { Field, InputType, Int } from "@nestjs/graphql";
import { IsAlpha, IsString } from "class-validator";

@InputType() // basicamente los InputTypes en GraphQL son como los dto {{ check documentation }}
export class CreatePetInput {
    @IsAlpha()
    @IsString()
    @Field()
    name: string;

    @Field({ nullable: true })
    type?: string;

    @Field(() => Int)
    ownerId: number;
}