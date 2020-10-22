import { Adapter } from '../interfaces/adapter.interface';

export class Link implements Adapter<Link> {
  reddit: string;
  article: string;
  wikipedia: string;

  adapt(item: any): Link {
    Object.assign(this, item);
    return this;
  }
}
