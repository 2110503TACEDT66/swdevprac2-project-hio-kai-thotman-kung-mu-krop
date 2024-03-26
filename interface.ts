import { Date, ObjectId } from "mongoose";

export interface DentistItem {
    _id: ObjectId,
    name: string,
    year_of_experience : number,
    area_of_expertise : string,
    medical_fee : number,
    __v: number,
    appointment: string[],
    id: string
  }
  
  export interface DentistJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: DentistItem[]
  }

  export interface BookingItem {
    name: string;
    surname: string;
    id: string;
    dentist: string;
    bookDate: Date;
  }

  export interface AppointmentJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: AppointmentItem[]
  }

  export interface AppointmentItem {
    apptDate: Date,
    user: ObjectId,
    dentist: DentistItemSmall,
    _id: ObjectId
  }

  export interface DentistItemSmall {
    _id : ObjectId,
    name : string,
    id : ObjectId
  }