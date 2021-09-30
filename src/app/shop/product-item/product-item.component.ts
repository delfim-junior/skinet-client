import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../shared/models/products';
import {select, Store} from '@ngrx/store';
import {IAppState} from '../../store/reducers';
import {addProductToBasket} from '../../store/actions/product.actions';
import {selectBasketList} from '../../store/selectors/product.selectors';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit(): void {
  }

  onAddToBasket(product: Product): void {
    this.store.dispatch(addProductToBasket({payload: product}));
  }


}
