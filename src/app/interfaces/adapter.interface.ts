/**
 * Adapter : interface is implemented in required
 * model classes to adapt the object.
 */
export interface Adapter<T> {
  adapt(item: any): T;
  collectionAdapt?(item: any): T[];
}
