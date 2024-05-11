import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  baseUrlApi:string = "http://127.0.0.1:5000";
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const data = { email, password };
    return this.http.post<any>(`${(this.baseUrlApi)}/api/auth/login`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  register(email: string, password: string): Observable<any> {
    const data = { email, password };
    return this.http.post<any>(`${(this.baseUrlApi)}/api/auth/register`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  logout(): Observable<any> {
    const token = localStorage.getItem('current_user_email')!;
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.post<any>(`${(this.baseUrlApi)}/api/auth/logout`, {}, { headers });
  }

  addNote(title: string, text: string, userId: number): Observable<any> {
    const data = { title, text, user_id: userId, status: 'pending' };
    const token = localStorage.getItem('current_user_email')!;
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', token);
    return this.http.post<any>(`${(this.baseUrlApi)}/api/todo/add-note`, data, { headers });
  }

  updateNote(noteId: number, title: string, text: string, status: string): Observable<any> {
    const data = { id: noteId, title, text, status };
    const token = localStorage.getItem('current_user_email')!;
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', token);
    return this.http.put<any>(`${(this.baseUrlApi)}/api/todo/update-note`, data, { headers });
  }

  getNotes(): Observable<any> {
    const token = localStorage.getItem('current_user_email')!;
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.get<any>(`${(this.baseUrlApi)}/api/todo/get-notes`, { headers });
  }

  deleteNote(noteId: number): Observable<any> {
    const token = localStorage.getItem('current_user_email')!;
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.delete<any>(`${(this.baseUrlApi)}/api/todo/delete-note?note_id=${noteId}`, { headers });
  }
}
