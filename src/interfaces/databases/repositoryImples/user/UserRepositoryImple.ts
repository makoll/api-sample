import { getRepository } from 'typeorm';

import { UserEntity as UserEntity } from '@/entities/User';
import { UserDbModel } from '@/interfaces/databases/models/User';
import { IUserRepository } from '@/interfaces/databases/repositories/user/IUserRepository';
import {
  toUserDbModel as toUserDbModel,
  toUserEntity,
} from '@/interfaces/databases/repositoryImples/user/converter/UserConverter';

export class UserRepository extends IUserRepository {
  public constructor() {
    super();
  }

  public async find(userId: string): Promise<UserEntity | null> {
    const userData = await getRepository(UserDbModel).findOne({
      where: { userId },
      relations: ['corporation'],
    });
    if (!userData) return null;
    const userEntity = toUserEntity(userData);
    return userEntity;
  }

  public async update(user: UserEntity): Promise<void> {
    const userModel = toUserDbModel(user);
    await getRepository(UserDbModel).save(userModel);
  }
}
