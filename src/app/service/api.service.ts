import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BASE_URL = 'https://appdata.sunwebapps.com/api';

  constructor(private http: HttpClient) { }

  checkUserExists(username: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/UserDetailNetMaster/${encodeURIComponent(username)}`);
  }

  validatePassword(username: string, password: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/ValidatePassword`, {
      params: { strusername: username, strPassword: password }
    });
  }

  getUserBranches(username: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/UseBranchNetMaster/${username}`);
  }

  getFinancialYear(branchCode: string, username: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/FinancialYear/${branchCode}/${username}/${branchCode}`);
  }

  getProductData(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/GetStockRelatedInfo/BR004174/DMCC`);
  }
}
