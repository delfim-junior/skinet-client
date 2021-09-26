import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {IAppState} from '../../store/reducers';
import {loadProductById} from '../../store/actions/product.actions';
import {selectedProduct} from '../../store/selectors/product.selectors';
import {Product} from '../../shared/models/products';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product;

  constructor(private route: ActivatedRoute, private store: Store<IAppState>) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(value => {
        this.store.dispatch(loadProductById({payload: value.id}));
      });

    this.store.pipe(select(selectedProduct)).subscribe(value => {
      this.product = value;
    });
  }

}
