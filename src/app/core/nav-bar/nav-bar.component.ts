import {Component, OnInit, TemplateRef} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {selectBasketList, selectIsSaving, selectPaymentStatus} from '../../store/selectors/product.selectors';
import {IAppState} from '../../store/reducers';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {FormControl, FormGroup} from '@angular/forms';
import {PaymentRequest} from '../../shared/models/payment-request';
import {sendPayment} from '../../store/actions/product.actions';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  modalRef?: BsModalRef;
  basketList$ = this.store.pipe(select(selectBasketList));
  isSaving$ = this.store.pipe(select(selectIsSaving));
  paymentStatus$ = this.store.pipe(select(selectPaymentStatus));
  totalPrice = 0;

  form: FormGroup;

  constructor(private store: Store<IAppState>, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.basketList$.subscribe(value => {
      this.totalPrice = 0;
      value.forEach(item => {
        this.totalPrice = this.totalPrice + item.price;
      });
    });

    this.form = new FormGroup({
      phoneNumber: new FormControl('')
    });

    this.paymentStatus$.subscribe(value => {
      if (value) {
        this.form.value.phoneNumber = '';
      }
    });
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  sendPayment(): void {
    console.log(this.form.value.phoneNumber);
    const paymentRequest = new PaymentRequest();
    paymentRequest.phoneNumber = this.form.value.phoneNumber;
    paymentRequest.totalPrice = this.totalPrice;
    this.store.dispatch(sendPayment({payload: paymentRequest}));
  }

}
