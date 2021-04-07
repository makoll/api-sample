import { UserEntity } from '@/entities/User';
import { UserDbModel } from '@/interfaces/databases/models/User';
import { toCorporationEntity } from '@/interfaces/databases/repositoryImples/user/converter/CorporationConverter';

export const toUserEntity = (user: UserDbModel): UserEntity => {
  if (!user.userId) throw new Error('ユーザーIDに値がありません');
  return new UserEntity({
    userId: user.userId,
    name: user.name,
    corporationId: user.corporationId,
    corporation: user.corporation ? toCorporationEntity(user.corporation) : undefined,
  });
};

export const toUserDbModel = (userEntity: UserEntity): UserDbModel =>
  new UserDbModel({
    userId: userEntity.userId,
    corporationId: userEntity.corporationId,
    name: userEntity.name,
  });
