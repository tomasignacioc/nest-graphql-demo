import { Field, InputType } from "@nestjs/graphql";
import { IsNumber } from "class-validator";

@InputType()
export class FindPetInput {
    @IsNumber()
    @Field()
    id: number
}