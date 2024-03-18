import { User } from "@/entities/User";

export interface UsersRepository {
   save(data: User): Promise<User>
   findByEmail(email: string): Promise<User>
}