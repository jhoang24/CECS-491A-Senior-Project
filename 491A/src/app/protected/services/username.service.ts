import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsernameService {
  private usernameSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  setUsername(username: string): void {
    this.usernameSubject.next(username);
  }

  getUsername(): Observable<string | null> {
    return this.usernameSubject.asObservable();
  }
}
