export class CreateAttendeeDto {
    dni: string;
    firstName: string;
    lastName: string;
    address: string;
    money: number;
    age: number;
    fears: string[];
    isNervous: boolean;
    budget: number;
    costumeId?: number; // Puedes ajustar los tipos según tus necesidades
  }
  