import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = '';

  constructor(@Inject('API_URL') private apiUrl: string, private http: HttpClient) { 
    this.baseUrl = this.apiUrl + 'api';
  }


  async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await this.http.post<any>(`${this.baseUrl}/login`, { email, password }).toPromise();
      const token = response.access_token;
      //const refreshToken = response.refresh_token;
      localStorage.setItem('access_token', token);
      return true;
    } catch(error: unknown) {
      if(error instanceof HttpErrorResponse && error.status === 401) {
        return false;
      }
      throw error;
    }
  }

  async logout(): Promise<boolean> {
    localStorage.removeItem('access_token');
    //localStorage.removeItem('refresh_token');
    return true;
  }

  /*async refreshToken(): Promise<string> {
    const refreshToken = localStorage.getItem('refresh_token');
    const response = await this.http.post<any>(`${this.baseUrl}/refresh`, { refresh_token: refreshToken }).toPromise();
    const token = response.access_token;
    localStorage.setItem('access_token', token);
    return token;
  }*/

  async get(endpoint: string, options?: any, retries: number = 0): Promise<any> {
    let url = `${this.baseUrl}/${endpoint}`;
    try {
      const token = localStorage.getItem('access_token');
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      const response = await this.http.get(url, { headers, ...options }).toPromise();
      return response;
    } catch (error: any) {
      if (error.status === 401 && retries > 0) {
        //await this.refreshToken();
        return await this.get(url, options, retries - 1);
      } else {
        throw error;
      }
    }
  }

  async post(endpoint: string, options?: any, retries: number = 0): Promise<any> {
    let url = `${this.baseUrl}/${endpoint}`;
    try {
      const token = localStorage.getItem('access_token');
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      const response = await this.http.post(url, { headers, ...options }).toPromise();
      return response;
    } catch (error: any) {
      if (error.status === 401 && retries > 0) {
        //await this.refreshToken();
        return await this.post(url, options, retries - 1);
      } else {
        throw error;
      }
    }
  }

  async put(endpoint: string, options?: any, retries: number = 0): Promise<any> {
    let url = `${this.baseUrl}/${endpoint}`;
    try {
      const token = localStorage.getItem('access_token');
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      const response = await this.http.put(url, { headers, ...options }).toPromise();
      return response;
    } catch (error: any) {
      if (error.status === 401 && retries > 0) {
        //await this.refreshToken();
        return await this.put(url, options, retries - 1);
      } else {
        throw error;
      }
    }
  }

  async delete(endpoint: string, options?: any, retries: number = 0): Promise<any> {
    let url = `${this.baseUrl}/${endpoint}`;
    try {
      const token = localStorage.getItem('access_token');
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      const response = await this.http.delete(url, { headers, ...options }).toPromise();
      return response;
    } catch (error: any) {
      if (error.status === 401 && retries > 0) {
        //await this.refreshToken();
        return await this.delete(url, options, retries - 1);
      } else {
        throw error;
      }
    }
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

}