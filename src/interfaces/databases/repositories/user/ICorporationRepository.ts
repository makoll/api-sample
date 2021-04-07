import { CorporationEntity } from '@/entities/Corporation';

export abstract class ICorporationRepository {
  abstract findCorporation(corporationId: number): Promise<CorporationEntity | null>;
}
