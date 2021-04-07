import { MaxLength, IsNumber } from 'class-validator';

import { Entity } from '@/entities';

export class CorporationEntity extends Entity {
  @IsNumber()
  readonly corporationId!: number | null;

  static readonly NAME_LENGTH = 100;
  @MaxLength(CorporationEntity.NAME_LENGTH)
  name!: string;

  constructor(init: Partial<CorporationEntity>) {
    super();
    Object.assign(this, init);
  }
}
