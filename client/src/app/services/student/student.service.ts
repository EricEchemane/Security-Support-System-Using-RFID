import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient) { }

  checkIfRfidIsAvailable(rfid: string) {
    return this.http.get<ResponseType>(`${serverUrl}/student/${rfid}`);
  }
}
