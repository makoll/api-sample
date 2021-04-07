import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity } from '@/entities/User';
import { CorporationDbModel } from '@/interfaces/databases/models/Corporation';

@Entity(UserDbModel.TABLE_NAME)
export class UserDbModel {
  static readonly TABLE_NAME = 'user';

  constructor(init: Partial<UserDbModel>) {
    Object.assign(this, init);
  }

  static readonly USER_ID = 'user_id';
  @PrimaryGeneratedColumn({ type: 'int', name: UserDbModel.USER_ID })
  userId!: number | null;

  static readonly NAME = 'name';
  @Column({ type: 'nvarchar', name: UserDbModel.NAME, length: UserEntity.NAME_LENGTH })
  name!: string;

  static readonly CORPORATION_ID = 'corporation_id';
  @Column({ type: 'int', name: UserDbModel.CORPORATION_ID, readonly: true })
  corporationId!: number | null;

  @ManyToOne(() => CorporationDbModel, (corporation) => corporation.users)
  @JoinColumn({ name: UserDbModel.CORPORATION_ID })
  corporation!: CorporationDbModel;
}
