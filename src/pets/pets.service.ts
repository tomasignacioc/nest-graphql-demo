import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OwnersService } from '../owners/owners.service';
import { Owner } from '../owners/entities/owner.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { Pet } from './pet.entity';

@Injectable()
export class PetsService {
    constructor(
        @InjectRepository(Pet) private petsRepository: Repository<Pet>,
        private ownersService: OwnersService,
    ){}

    createPet(createPetInput: CreatePetInput): Promise<Pet>{
        const newPet = this.petsRepository.create(createPetInput); // newPet = new Pet(); newPet.name = input.name, etc

        return this.petsRepository.save(newPet); // insert
    }

    findAll(): Promise<Pet[]> {

        return this.petsRepository.find(); // SELECT * FROM pet
    }

    findOne(id: number): Promise<Pet> {
        return this.petsRepository.findOneOrFail(id)
    }

    getOwner(ownerId: number): Promise<Owner> {
        return this.ownersService.findOne(ownerId)
    }
}
