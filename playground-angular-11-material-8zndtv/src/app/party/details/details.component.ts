import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PartyService } from '../party.service';
import { take } from 'rxjs/operators';
import {
  AddressDetails,
  BankDetails,
  PartyDetails,
} from '../../entities/PartyDetails.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Response } from '../../entities/Response.interface';
import moment from 'moment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  partyDetailsForm: FormGroup;
  partyId: string;
  phnMask = '(000) 000-0000';
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private partyService: PartyService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.partyId = this.route.snapshot.paramMap.get('id');
    this.createForm();
    if (this.partyId) {
      this.getPartyDetails(this.partyId);
    }
  }

  createForm() {
    this.partyDetailsForm = this.formBuilder.group({
      login_access: [false],
      name: [],
      company_name: ['', Validators.required],
      mobile_no: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      telephone_no: [
        null,
        [Validators.minLength(10), Validators.maxLength(10)],
      ],
      whatsapp_no: [null, [Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      remark: [''],
      date_of_birth: [null],
      anniversary_date: [null],
      gstin: [''],
      pan_no: [''],
      apply_tds: [false],
      credit_limit: ['', Validators.required],
      is_active: [false],
      image: [null],
      bank: this.formBuilder.array([]),
      address: this.formBuilder.array([]),
      userid: this.formBuilder.group({
        id: [''],
        username: [''],
        phone_number: [
          '',
          [Validators.minLength(10), Validators.maxLength(10)],
        ],
        user_permissions: [],
        is_active: [false],
      }),
    });
  }

  getPartyDetails(id: string) {
    this.partyService
      .getPartyById(id)
      .pipe(take(1))
      .subscribe((party: PartyDetails) => {
        this.partyDetailsForm.patchValue(party);
        party.bank_id?.forEach((bankDetails: BankDetails, index: number) => {
          (this.partyDetailsForm.get('bank') as FormArray).push(
            this.buildBankDetailsForm()
          );
          (this.partyDetailsForm.get('bank') as FormArray)
            .at(index)
            .patchValue(bankDetails);
        });

        party.address?.forEach((address: AddressDetails, index: number) => {
          (this.partyDetailsForm.get('address') as FormArray).push(
            this.buildAddressForm()
          );
          (this.partyDetailsForm.get('address') as FormArray)
            .at(index)
            .patchValue(address);
        });
      });
  }

  buildBankDetailsForm() {
    return this.formBuilder.group({
      id: [null],
      bank_ifsc_code: [null, Validators.required],
      bank_name: [null, Validators.required],
      branch_name: [null, Validators.required],
      account_no: [null, Validators.required],
      account_holder_name: [null, Validators.required],
      is_active: [false],
    });
  }

  buildAddressForm() {
    return this.formBuilder.group({
      id: [null],
      address_line_1: [null, Validators.required],
      address_line_2: [null, Validators.required],
      country: [null, Validators.required],
      state: [null, Validators.required],
      city: [null, Validators.required],
      pincode: [null, Validators.required],
    });
  }

  addBankDetails() {
    (this.partyDetailsForm.get('bank') as FormArray).insert(
      0,
      this.buildBankDetailsForm()
    );
  }

  deleteBankDetails(index: number) {
    (this.partyDetailsForm.get('bank') as FormArray).removeAt(index);
  }

  addAddressDetails() {
    (this.partyDetailsForm.get('address') as FormArray).insert(
      0,
      this.buildAddressForm()
    );
  }

  deleteAddressDetails(index: number) {
    (this.partyDetailsForm.get('address') as FormArray).removeAt(index);
  }

  submitParty() {
    if (this.partyId) {
      this.updateParty(this.partyId);
    } else {
      this.addNewParty();
    }
    console.log(this.partyDetailsForm);
  }

  get bankArray(): FormArray {
    return this.partyDetailsForm?.get('bank') as FormArray;
  }

  get addressArray(): FormArray {
    return this.partyDetailsForm?.get('address') as FormArray;
  }

  back() {
    this.router.navigate(['/party-details']);
  }

  addNewParty() {
    this.partyService
      .addNewParty(this.partyDetailsForm.getRawValue())
      .pipe(take(1))
      .subscribe((res: Response) => {
        if (res.success) {
          this._snackBar.open(res.msg, 'X');
          this.router.navigate(['/party-details']);
        }
        console.log(res);
      });
  }

  updateParty(partyId: string) {
    this.partyService
      .updateParty(
        partyId,
        this.jsonToFormData(this.partyDetailsForm.getRawValue())
      )
      .pipe(take(1))
      .subscribe((res: Response) => {
        if (res.success) {
          this._snackBar.open(res.msg, 'X');
          this.router.navigate(['/party-details']);
        }
      });
  }

  jsonToFormData(jsonObject: any): FormData {
    const formData = new FormData();
    for (const key in jsonObject) {
      if (jsonObject.hasOwnProperty(key)) {
        const value = jsonObject[key];
        if (
          (Array.isArray(value) || typeof value === 'object') &&
          value !== null
        ) {
          formData.append(key, JSON.stringify(value));
        } else if (value !== null) {
          formData.append(key, value);
        }
      }
    }

    return formData;
  }

  onDateInput(event: any, formControl: string) {
    console.log(event.value);
    this.partyDetailsForm
      .get(formControl)
      .patchValue(moment(event.value).format('yyyy-MM-DD'));
  }
}
