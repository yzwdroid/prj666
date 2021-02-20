import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit {

  @Input() page;

  @Output() newPage = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

    // Previous page
    prevPage() {
      if (this.page > 1) {
        this.newPage.emit(this.page - 1);
      }

    }

    // Next page
    nextPage() {
      this.newPage.emit(this.page + 1);
    }

}
