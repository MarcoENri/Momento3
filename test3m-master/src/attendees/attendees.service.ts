import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAttendeeDto } from './dto/update-attendee.dto';
import { CreateAttendeeDto } from './dto/create-attendee.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AttendeesService {
  constructor(private prisma: PrismaService) {}

  async create(createAttendeeDto: CreateAttendeeDto) {
    return this.prisma.attendee.create({ data: createAttendeeDto });
  }

  async findAll() {
    return this.prisma.attendee.findMany();
  }

  async findOne(id: number) {
    if (!id || typeof id !== 'number') {
      throw new NotFoundException('ID no válido.');
    }

    return this.prisma.attendee.findUnique({ where: { id } });
  }

  async update(id: number, updateAttendeeDto: UpdateAttendeeDto) {
    return this.prisma.attendee.update({ where: { id }, data: updateAttendeeDto });
  }

  async remove(id: number) {
    return this.prisma.attendee.delete({ where: { id } });
  }

  async purchaseCostumes() {
    const attendees = await this.prisma.attendee.findMany();
    const costumes = await this.prisma.costume.findMany({ where: { stock: true } });

    const purchases = [];

    for (const attendee of attendees) {
      const costume = costumes.pop();

      if (!costume) {
        throw new NotFoundException('No hay suficientes disfraces en stock.');
      }

      if (attendee.budget < costume.price) {
        // Manejo de Presupuesto Insuficiente
        await this.increaseBudget(attendee.id, costume.price - attendee.budget);
      }

      purchases.push({ attendee, costume });
    }

    const updatePromises = purchases.map(({ attendee, costume }) =>
      this.prisma.attendee.update({
        where: { id: attendee.id },
        data: {
          budget: attendee.budget - costume.price,
        },
      })
    );

    await Promise.all(updatePromises);

    return purchases;
  }

  async addCostumesToInventory(costumesToAdd: number) {
     "this.prisma.costume.createMany"
  }

  async increaseBudget(attendeeId: number, amount: number) {
   this.prisma.attendee.update({ where: { id: attendeeId }, data: { budget: { increment: amount } } })
  }

  async findAdultAttendees() {
    return this.prisma.attendee.findMany({
      where: {
        age: {
          gte: 20,
        },
      },
    });
  }

  async findNervousAttendees() {
    try {
      const nervousAttendees = await this.prisma.attendee.findMany({
        where: {
          isNervous: true,
        },
      });
      return nervousAttendees;
    } catch (error) {
      console.error('Error finding nervous attendees:', error);
      throw error;
    }
  }
}
