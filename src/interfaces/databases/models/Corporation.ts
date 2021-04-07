import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CorporationEntity } from '@/entities/Corporation';
import { UserDbModel } from '@/interfaces/databases/models/User';

@Entity(CorporationDbModel.TABLE_NAME)
export class CorporationDbModel {
  static readonly TABLE_NAME = 'corporation';

  constructor(init: Partial<CorporationDbModel>) {
    Object.assign(this, init);
  }

  static readonly CORPORATION_ID = 'corporation_id';
  @PrimaryGeneratedColumn({ type: 'int', name: CorporationDbModel.CORPORATION_ID })
  corporationId!: number | null;

  static readonly NAME = 'name';
  @Column({ type: 'nvarchar', name: CorporationDbModel.NAME, length: CorporationEntity.NAME_LENGTH })
  name!: string;

  @OneToMany(() => UserDbModel, (user) => user.userId)
  users!: UserDbModel[];
}
