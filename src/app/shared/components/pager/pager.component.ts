import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageChangedEvent} from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {
  @Output() pageChanged = new EventEmitter<PageChangedEvent>();
  @Input() pageSize: number;
  @Input() totalCount: number;

  constructor() {
  }

  ngOnInit(): void {
  }

  onPageChanged(event: PageChangedEvent): void {
    this.pageChanged.emit(event);
  }

}
