import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreatePetInput } from './dto/create-pet.input';
import { Pet } from './pet.entity';
import { PetsService } from './pets.service';

@Resolver(of => Pet)
export class PetsResolver {
    // behind the scenes nestjs creates an instance of PetsService and injects it to the resolver
    constructor(private petService: PetsService){}

    @Query(returns => [Pet])
    pets(): Promise<Pet[]> {
        return this.petService.findAll();
    }

    @Mutation(returns => Pet)
    createPet(@Args('createPetInput') createPetInput: CreatePetInput): Promise<Pet> {
        return this.petService.createPet(createPetInput);
    }
}
