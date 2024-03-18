import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { CreateUserUsecase } from "@/usecases/CreateUser";
import { PrismaUsersRepository } from "@/repositories/PrismaUsersRepository";

export async function registerController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerBodySchema = z.object({
    name: z.string(),
    password: z.string(),
    email: z.string(),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  const usersRepository = new PrismaUsersRepository();
  const createUserUsecase = new CreateUserUsecase(usersRepository);

  await createUserUsecase.execute({ email, name, password });
  return reply.status(201).send();
}
