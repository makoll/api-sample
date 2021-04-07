import { MaxLength, IsNumber } from 'class-validator';

import { Entity } from '@/entities';
import { CorporationEntity } from '@/entities/Corporation';

export class UserEntity extends Entity {
  @IsNumber()
  userId!: number | null;

  static readonly NAME_LENGTH = 600;
  @MaxLength(UserEntity.NAME_LENGTH)
  name!: string;

  @IsNumber()
  corporationId!: number | null;
  corporation?: CorporationEntity;

  constructor(init: UserEntity) {
    super();
    Object.assign(this, init);
  }
}
