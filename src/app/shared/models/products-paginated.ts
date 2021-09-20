import {Product} from './products';

export class ProductsPaginated {
  count: number;
  data: Product[];
  pageIndex: number;
  pageSize: number;
}
