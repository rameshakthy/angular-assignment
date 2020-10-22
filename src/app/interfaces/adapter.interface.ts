export interface Adapter<T> {
  adapt(item: any): T;
  collectionAdapt?(item: any): T[];
}
