export interface PartyDetails {
  id: string;
  bank?: BankDetails[];
  bank_id?: BankDetails[];
  address: [];
  userid: {
    id: string;
    username: string;
    phone_number: null;
    user_permissions: [];
    is_active: true;
  };
  login_access: true;
  name: string;
  company_name: string;
  mobile_no: string;
  telephone_no: string;
  whatsapp_no: string;
  email: string;
  remark: string;
  date_of_birth: string;
  anniversary_date: string;
  gstin: string;
  pan_no: string;
  apply_tds: true;
  credit_limit: 123;
  is_active: true;
  image: null;
}

export interface BankDetails {
  id: string;
  bank_ifsc_code: string;
  bank_name: string;
  branch_name: string;
  account_no: string;
  account_holder_name: string;
  is_active: true;
}

export interface AddressDetails {
  id: string;
  address_line_1: string;
  address_line_2: string;
  country: string;
  state: string;
  city: string;
  pincode: true;
}
