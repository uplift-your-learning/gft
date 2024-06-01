import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../entities/CommonUtils';
import { PartyDetails } from '../entities/PartyDetails.interface';

@Injectable()
export class PartyService {
  baseUrl = baseUrl;
  constructor(private http: HttpClient) {}

  getAllPartyDetails() {
    return this.http.get(this.baseUrl + `/party/`);
  }

  getPartyById(id: string) {
    return this.http.get(this.baseUrl + `/party/?id=` + id);
  }

  deleteParty(id: string) {
    return this.http.delete(this.baseUrl + `/party/?id=` + id);
  }

  addNewParty(partyDetails: PartyDetails) {
    return this.http.post(this.baseUrl + `/party/`, partyDetails);
  }

  updateParty(partyId: string, formData: FormData) {
    return this.http.patch(this.baseUrl + `/party/?id=${partyId}`, formData);
  }
}
