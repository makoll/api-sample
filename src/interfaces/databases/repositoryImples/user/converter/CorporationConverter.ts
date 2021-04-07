import { CorporationEntity as CorporationEntity } from '@/entities/Corporation';
import { CorporationDbModel as CorporationModel } from '@/interfaces/databases/models/Corporation';

export const toCorporationEntity = (corporation: CorporationModel): CorporationEntity => {
  if (!corporation.corporationId) throw new Error('会社IDに値がありません');
  return new CorporationEntity({
    corporationId: corporation.corporationId,
    name: corporation.name,
  });
};

export const toCorporationDbModel = (corporation: CorporationEntity): CorporationModel => {
  if (!corporation.corporationId) throw new Error('会社IDに値がありません');
  return new CorporationModel({
    corporationId: corporation.corporationId,
    name: corporation.name,
  });
};
