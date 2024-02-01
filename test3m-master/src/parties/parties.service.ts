import { Injectable } from '@nestjs/common';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';
import { PrismaService } from "../prisma/prisma.service";
@Injectable()
export class PartiesService {
  constructor(private prisma: PrismaService) {}

  create(createPartyDto: CreatePartyDto) {
    return "this party is very nice!!"
  }

  findAll() {
    return this.prisma.party.findMany();
  }

  findOne(id: number) {
    return this.prisma.party.findUnique({ where: { id } });
  }

  update(id: number, updatePartyDto: UpdatePartyDto) {
    return this.prisma.party.update({ where: { id }, data: updatePartyDto });
  }

  remove(id: number) {
    return this.prisma.party.delete({ where: { id } });
  }

  findPartiesByDate(date: Date) {
    return this.prisma.party.findMany({
      where: {
        date: {
          gte: date, 
        },
      },
    });
  }
}


