import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient) { }

  creditData(payload): Observable<IcardData[]> {
    return this.http.post<IcardData[]>(`${this.apiUrl}`, payload);
  }
}

export interface IcardData {
  amount: number;
  cardCVV: string;
  cardHolderName: string;
  cardNumber: string;
  expiryMonth: number;
  expiryYear: number;
}
