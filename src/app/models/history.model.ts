import { Link } from './links.model';
import { Adapter } from '../interfaces/adapter.interface';
import { map } from 'rxjs/operators';

export class HistoryModel implements Adapter<HistoryModel> {
  id: number;
  title: string;
  event_date_utc: string;
  event_date_unix: string;
  flight_number: string;
  details: string;
  links: Link;

  adapt(item: any): HistoryModel {
    Object.assign(this, item);
    return this;
  }

  collectionAdapt(items: any): HistoryModel[] {
    return items.map((subItem) => new HistoryModel().adapt(subItem));
  }
}
