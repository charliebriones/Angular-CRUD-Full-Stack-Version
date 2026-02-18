import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client, UserDto } from '../../services/api-client';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private client: Client) {}

  getUsers(): Observable<UserDto[]> {
    return this.client.usersAll();
  }

  getUserById(id: number): Observable<UserDto> {
    return this.client.usersGET(id);
  }

  createUser(user: UserDto): Observable<UserDto> {
    console.log('service createUser', user);
    return this.client.usersPOST(user);
  }

  updateUser(id: number, user: UserDto): Observable<void> {
    return this.client.usersPUT(id, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.client.usersDELETE(id);
  }
}
