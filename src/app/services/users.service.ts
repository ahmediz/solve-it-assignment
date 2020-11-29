import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly users = new BehaviorSubject<any[]>([]);
  pageInfo = new BehaviorSubject<any>(null);
  private readonly selectedUser = new BehaviorSubject<any>(null);
  selectedUser$ = this.selectedUser.asObservable();
  constructor() { }

  get getUsers(): any[] {
    return this.users.getValue();
  }

  get getSelectedUser(): any {
    return this.selectedUser.getValue();
  }

  get getPageInfo(): any[] {
    return this.pageInfo.getValue();
  }

  setUsers(val: any[]): void {
    this.users.next(val);
  }

  setSelectedUser(val: any): void {
    this.selectedUser.next(val);
  }
}
