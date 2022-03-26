import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { CreatePetInput } from './dto/create-pet.input';
import { FindPetInput } from './dto/find-pet.input';
import { Pet } from './pet.entity';
import { Owner } from '../owners/entities/owner.entity';
import { PetsService } from './pets.service';

@Resolver(() => Pet)
export class PetsResolver {
    // behind the scenes nestjs creates an instance of PetsService and injects it to the resolver
    constructor(private petService: PetsService) { }

    @Query(() => Pet)
    // in-line definition requires defining the Args name and scalar type
    getPet(@Args('id', { type: () => Int }) id: number): Promise<Pet> {
        return this.petService.findOne(id)
    }

    @Query(() => [Pet])
    pets(): Promise<Pet[]> {
        return this.petService.findAll();
    }

    @ResolveField(() => Owner)
    owner(@Parent() pet: Pet): Promise<Owner> {
        return this.petService.getOwner(pet.ownerId)
    }

    @Mutation(() => Pet)
    createPet(@Args('createPetInput') createPetInput: CreatePetInput): Promise<Pet> {
        return this.petService.createPet(createPetInput);
    }
}
