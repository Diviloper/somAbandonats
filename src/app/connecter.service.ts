import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConnecterService {

  constructor(private httpClient: HttpClient) {
  }

  api = 'localhost:3000/api';

  async login(email: string, password: string): Promise<any> {
    return this.httpClient.post(this.api + '/login', {email: email, password: password});
  }

  async signin(email: string, password: string, nom: string, cognoms: string, dni: string) {
    return this.httpClient.post(this.api + 'signin', {
      email: email,
      firstName: nom,
      secondName: cognoms,
      password: password,
      dni: dni
    });
  }

  async getPeople(): Promise<any> {
    return this.httpClient.get(this.api + '/users');
  }
}
