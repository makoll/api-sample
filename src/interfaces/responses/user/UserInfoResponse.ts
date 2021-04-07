import { UserEntity } from '@/entities/User';

export type TUserResponse = Readonly<
  Pick<UserEntity, 'userId' | 'corporationId' | 'name'> & {
    corporationName: string;
  }
>;
