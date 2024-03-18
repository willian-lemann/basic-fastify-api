import bcrypt from "bcryptjs";
import { db } from "@/lib/database";
import { PrismaUsersRepository } from "@/repositories/PrismaUsersRepository";
import { UsersRepository } from "@/repositories/UsersRepository";
import { UserAlreadyExistException } from "@/http/errors/UserAlreadyExistException";
import { BadRequestException } from "@/http/errors/BadRequestException";

type Input = {
  email: string;
  password: string;
  name: string;
};

export class CreateUserUsecase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ email, name, password }: Input) {
    const passwordHash = await bcrypt.hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistException();
    }

    await this.usersRepository.save({ email, name, password: passwordHash });
  }
}
