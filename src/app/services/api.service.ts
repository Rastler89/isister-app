import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient, private auth: AuthService) { }

  async get(endpoint: string): Promise<any> {
    const url = `${endpoint}`;
    return this.auth.get(url);
  }

  async post(endpoint: string): Promise<any> {
    const url = `${endpoint}`;
    return this.auth.get(url);
  }

  async put(endpoint: string): Promise<any> {
    const url = `${endpoint}`;
    return this.auth.get(url);
  }

  async delete(endpoint: string): Promise<any> {
    const url = `${endpoint}`;
    return this.auth.get(url);
  }

  async myPets(): Promise<any> {
    return this.get('my-pets');
  }

}