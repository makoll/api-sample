import { UserEntity } from '@/entities/User';

export abstract class IUserRepository {
  abstract find(userId: string): Promise<UserEntity | null>;
  abstract update(user: UserEntity): Promise<void>;
}
