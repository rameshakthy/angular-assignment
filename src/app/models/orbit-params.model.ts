import { Adapter } from '../interfaces/adapter.interface';

export class OrbitParams implements Adapter<OrbitParams> {
  reference_system: string;
  regime: string;
  longitude: number | null;
  semi_major_axis_km: number | null;
  eccentricity: number | null;
  periapsis_km: number | null;
  apoapsis_km: number | null;
  inclination_deg: number | null;
  period_min: number | null;
  lifespan_years: number | null;
  epoch: number | null;
  mean_motion: number | null;
  raan: number | null;
  arg_of_pericenter: number | null;
  mean_anomaly: number | null;

  adapt(item: any): OrbitParams {
    Object.assign(this, item);
    return this;
  }
}
