import { Injectable } from '@angular/core';

const serverUrl = "http://localhost:4000";

interface ResponseType {
  success: boolean;
  message: string;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  async checkIfRfidIsAvailable(rfid: string): Promise<ResponseType> {
    const res = await fetch(`${serverUrl}/student/${rfid}`);
    return (await res.json());
  }
}
