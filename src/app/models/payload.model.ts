import { Adapter } from '../interfaces/adapter.interface';
import { OrbitParams } from './orbit-params.model';

export class Payload implements Adapter<Payload> {
  payload_id: number;
  norad_id: any[];
  reused: boolean;
  customers: string[];
  nationality: string;
  manufacturer: string;
  payload_type: string;
  payload_mass_kg: number;
  payload_mass_lbs: number;
  orbit: string;
  orbit_params: OrbitParams;

  adapt(item: any): Payload {
    Object.assign(this, item);
    return this;
  }

  collectionAdapt(items: any): Payload[] {
    return items.map((subItem) => new Payload().adapt(subItem));
  }
}
