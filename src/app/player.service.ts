import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private apiUrl = 'http://localhost:3000/players'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  deletePlayer(playerId: number): Observable<any> {
    const url = `${this.apiUrl}/${playerId}`;
    return this.http.delete(url);
  }

  addPlayer(player: any): Observable<any> {
    return this.http.post(this.apiUrl, player);
  }
}
