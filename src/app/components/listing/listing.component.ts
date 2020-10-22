import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { HistoryService } from 'src/app/services/history.service';
import { PayloadService } from 'src/app/services/payload.service';
import { APP_CONSTANTS } from 'src/app/constants/app-constants';

import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit, AfterViewInit {
  public constants = APP_CONSTANTS;
  public columns: string[] = [];
  public columnsAlias: any;
  public dataSource: MatTableDataSource<any>;

  public dataTypes = [APP_CONSTANTS.TYPE.HISTORY, APP_CONSTANTS.TYPE.PAYLOAD];

  constructor(
    private cdr: ChangeDetectorRef,
    private historyService: HistoryService,
    private payloadService: PayloadService
  ) {}

  /**
   * Private methods starts
   */

  /**
   * fetchAllHistories : methods initializes the data-table structure
   * and triggers remote API call
   */
  private fetchAllHistories() {
    this.columns = ['title', 'event_date_utc', 'flight_number', 'details'];
    this.columnsAlias = {
      title: {
        displayName: 'Title',
      },
      event_date_utc: {
        displayName: 'Event Date',
      },
      flight_number: {
        displayName: 'Flight No.',
      },
      details: {
        displayName: 'Details',
      },
    };
    this.historyService.getAllHistories().subscribe((response: any[]) => {
      if (response) {
        this.dataSource = new MatTableDataSource(response);
      }
    });
  }

  /**
   * fetchAllPayloads : methods initializes the data-table structure
   * and triggers remote API call
   */
  private fetchAllPayloads() {
    this.columns = [
      'payload_id',
      'nationality',
      'manufacturer',
      'payload_type',
      'payload_mass_kg',
      'orbit',
      'orbit_params',
    ];

    this.columnsAlias = {
      payload_id: {
        displayName: 'Payload ID',
      },
      nationality: {
        displayName: 'Nationality',
      },
      manufacturer: {
        displayName: 'Manufacturer',
      },
      payload_type: {
        displayName: 'Type',
      },
      payload_mass_kg: {
        displayName: 'Mass (kg)',
      },
      payload_mass_lbs: {
        displayName: 'Mass (lbs)',
      },
      orbit: {
        displayName: 'Orbit',
      },
      orbit_params: {
        displayName: 'Reference System',
        field: 'reference_system',
        objectField: true,
      },
    };

    this.payloadService.getAllPayloads().subscribe((response: any[]) => {
      if (response) {
        this.dataSource = new MatTableDataSource(response);
      }
    });
  }

  /**
   * Private methods ends
   */

  /**
   * Public methods starts
   */

  /**
   * loadData method selects the data-table between HISTORY and PAYLOAD
   * Default selection is HISTORY
   * @param type string
   */
  public loadData(type) {
    switch (type) {
      case APP_CONSTANTS.TYPE.HISTORY:
        this.fetchAllHistories();
        break;
      case APP_CONSTANTS.TYPE.PAYLOAD:
        this.fetchAllPayloads();
        break;
      default:
        this.fetchAllHistories();
        return;
    }
  }

  /**
   * Public methods ends
   */

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.loadData(null);
    this.cdr.detectChanges();
  }
}
