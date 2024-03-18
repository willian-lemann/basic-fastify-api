import { Prisma } from "@prisma/client";
import { UsersRepository } from "./UsersRepository";
import { db } from "@/lib/database";
import { User } from "@/entities/User";

export class PrismaUsersRepository implements UsersRepository {
   async save(data: Prisma.UserCreateInput) {
      const user = await db.user.create({
         data
      })

      if (!user) {
         throw new Error("User not found.")
      }

      return new User(user.id, user.email, user.password, user.name)
   }


   async findByEmail(email: string) {
      const user = await db.user.findUnique({
         where: {
            email
         }
      })

      if (!user) {
         throw new Error("User not found.")
      }

      return new User(user.id, user.email, user.password, user.name)
   }
}