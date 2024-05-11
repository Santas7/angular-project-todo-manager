import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = '/api'; // Замените на ваш базовый URL API
  private userIdKey = 'userId';

  constructor(private http: HttpClient) { }

  // Метод для регистрации нового пользователя
  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, userData);
  }

  // Метод для входа существующего пользователя
  loginUser(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, userData);
  }

  // Метод для получения информации о текущем пользователе
  getCurrentUser(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/me?id=${userId}`);
  }

  // Метод для выхода пользователя из системы
  logoutUser(): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/logout`, {});
  }

  // Метод для получения всех заметок пользователя
  getNotes(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/todo/get-notes?user_id=${userId}`);
  }

  // Метод для добавления новой заметки
  addNote(noteData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/todo/add-note`, noteData);
  }

  // Метод для удаления заметки
  deleteNote(noteId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/todo/delete-note?note_id=${noteId}`);
  }

  // Метод для обновления существующей заметки
  updateNote(noteData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/todo/update-note`, noteData);
  }
}
