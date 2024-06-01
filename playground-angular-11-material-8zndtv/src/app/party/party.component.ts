import { Component, OnInit } from '@angular/core';
import { PartyService } from './party.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.scss'],
})
export class PartyComponent implements OnInit {
  partyDetails: any[];
  displayedColumns: string[] = [
    'id',
    'name',
    'company_name',
    'mobile_no',
    'telephone_no',
    'whatsapp_no',
    'email',
    'bank_details',
    'address',
    'action',
  ];
  dataSource: any;

  constructor(
    private partyService: PartyService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getPartyDetails();
  }

  getPartyDetails() {
    this.partyService
      .getAllPartyDetails()
      .pipe(take(1))
      .subscribe((partyDetails: any[]) => {
        this.partyDetails = partyDetails;
        this.dataSource = new MatTableDataSource<any>(this.partyDetails);
      });
  }

  editPartyDetails(index: string) {
    this.router.navigate(['/party-details/party/' + index]);
  }

  deleteParty(id: string) {
    this.partyService
      .deleteParty(id)
      .pipe(take(1))
      .subscribe((res) => {
        this._snackBar.open('Party Deleted Successfully', 'X');
        this.getPartyDetails();
      });
  }

  addParty() {
    this.router.navigate(['/party-details/party']);
  }
}
