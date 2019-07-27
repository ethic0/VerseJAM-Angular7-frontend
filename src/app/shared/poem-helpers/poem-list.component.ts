import { Component, Input } from '@angular/core';

import { Poem, PoemListConfig, PoemsService } from '../../core';
@Component({
  selector: 'app-poem-list',
  styleUrls: ['poem-list.component.css'],
  templateUrl: './poem-list.component.html'
})
export class PoemListComponent {
  constructor (
    private poemsService: PoemsService
  ) {}

  @Input() limit: number;
  @Input()
  set config(config: PoemListConfig) {
    if (config) {
      this.query = config;
      this.currentPage = 1;
      this.runQuery();
    }
  }

  query: PoemListConfig;
  results: Poem[];
  loading = false;
  currentPage = 1;
  totalPages: Array<number> = [1];

  setPageTo(pageNumber) {
    this.currentPage = pageNumber;
    this.runQuery();
  }

  runQuery() {
    this.loading = true;
    this.results = [];

    // Create limit and offset filter (if necessary)
    if (this.limit) {
      this.query.filters.limit = this.limit;
      this.query.filters.offset =  (this.limit * (this.currentPage - 1));
    }

    this.poemsService.query(this.query)
    .subscribe(data => {
      this.loading = false;
      this.results = data.poems;

      // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
      this.totalPages = Array.from(new Array(Math.ceil(data.poemsCount / this.limit)), (val, index) => index + 1);
    });
  }
}
