import { getRepository } from 'typeorm';

import { CorporationEntity as CorporationEntity } from '@/entities/Corporation';
import { CorporationDbModel } from '@/interfaces/databases/models/Corporation';
import { ICorporationRepository } from '@/interfaces/databases/repositories/user/ICorporationRepository';
import { toCorporationEntity as toCorporationEntity } from '@/interfaces/databases/repositoryImples/user/converter/CorporationConverter';

export class CorporationRepository extends ICorporationRepository {
  public constructor() {
    super();
  }

  public findCorporation = async (corporationId: number): Promise<CorporationEntity | null> => {
    const corporation = await getRepository(CorporationDbModel).findOne({ corporationId });
    if (!corporation) return null;
    return toCorporationEntity(corporation);
  };
}
