import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @Input() dataSource: MatTableDataSource<any>;
  @Input() displayedColumns: string[];
  @Input() columnsAlias: any;

  constructor(private cdr: ChangeDetectorRef) {}

  /**
   * Private methods starts
   */

  /**
   * Check for Object data
   * @param column boolean
   */

  private isObject(column) {
    return (
      this.columnsAlias[column].objectField !== undefined &&
      this.columnsAlias[column].objectField
    );
  }

  /**
   * Private methods ends
   */

  /**
   * Public methods starts
   */

  /**
   * SearchTearm methods filters the data-table by given input text
   * @param searchKey string
   */
  public searchTerm(searchKey: Event) {
    const filterValue = (searchKey.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Retrieve value from JSON data
   * @param element Object
   * @param column attribute
   */
  public getCellField(element, column) {
    if (this.isObject(column)) {
      if (element[column]) {
        return element[column][this.columnsAlias[column].field];
      }
    } else {
      return element[column];
    }
  }

  /**
   * Public methods ends
   */

  ngOnInit(): void {}

  /**
   * ngOnChanges for refreshing the data-table component on input change
   */
  ngOnChanges() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
}
