import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCostumeDto } from './dto/create-costume.dto';
import { UpdateCostumeDto } from './dto/update-costume.dto';

@Injectable()
export class CostumesService {
  constructor(private prisma: PrismaService) {}

  create(createCostumeDto: CreateCostumeDto) {
    return "this costume was create with succes!!"
  }

  findAll() {
    return this.prisma.costume.findMany();
  }

  findOne(id: number) {
    return this.prisma.costume.findUnique({ where: { id } });
  }

  update(id: number, updateCostumeDto: UpdateCostumeDto) {
    return this.prisma.costume.update({ where: { id }, data: updateCostumeDto });
  }

  remove(id: number) {
    return this.prisma.costume.delete({ where: { id } });
  }

  async getCostumesInStock() {
    return this.prisma.costume.findMany({ where: { stock: true } });
  }

  async addCostumesToInventory(count: number) {
    const currentStock = await this.prisma.costume.count({ where: { stock: true } });

    if (currentStock >= count) {
      return { message: 'El inventario ya satisface la demanda.' };
    }

    const costumesToAdd = count - currentStock;

    for (let i = 0; i < costumesToAdd; i++) {
      await this.prisma.costume.create({
        data: {
          stock: true,
          name: `Disfraz${i + 1}`,
          price: 19.99,
          costume:"Nuevos trajes"
        },
      })
    };
  return { message: `Se han agregado ${costumesToAdd} disfraces al inventario.` };
  }
}
