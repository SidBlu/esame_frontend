import { Injectable } from '@angular/core';
import { Subject, ReplaySubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiBaseUrl = "api/users"
  //datiUtente = new Subject();
  datiUtente = new ReplaySubject;
  ruoloUtente = new ReplaySubject();


  constructor(private http: HttpClient) { }

  nuovoUtente(dati: any): Observable<any>{
    return this.http.post<any>(`${this.apiBaseUrl}/signup`, dati)
  }

  getUser(email: string): Observable<any>{
    const user = {
      email: email
    }
    return this.http.post<any>(`${this.apiBaseUrl}/user`, user)
  }

}
