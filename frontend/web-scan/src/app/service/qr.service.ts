import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface QrRecord {
  id: number;
  name: string;
  document_no: string;
  qr_token: string;
  is_valid: number;
}

@Injectable({
  providedIn: 'root'
})
export class QrService {
  constructor(private http: HttpClient) {}

  generateQR(data: any) {
    return this.http.post('/qr/generate', data);
  }

  verifyQR(token: string | null) {
    return this.http.get(`/qr/verify/${token}`);
  }

  getRecords(): Observable<QrRecord[]> {
    return this.http.get<QrRecord[]>(`/qr/list`);
  }
  
  deleteRecord(id: number) {
    return this.http.delete(`/qr/delete/${id}`);
  }

}
