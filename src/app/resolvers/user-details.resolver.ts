import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { usersApi } from '../api.constants';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsResolver implements Resolve<any> {
  constructor(private http: HttpClient, private usersService: UsersService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const id = route.paramMap.get('id');
    const selectedUser = this.usersService.getSelectedUser;
    if (selectedUser && selectedUser.id === id) {
      return this.usersService.selectedUser$.pipe(
        take(1),
        map(res => res)
      );
    } else {
      return this.http.get(`${usersApi}/${id}`).pipe(
        switchMap((details: any) => {
          return this.http.get(`${usersApi}/${id}/posts`).pipe(
            map((res) => {
              const response = {
                id,
                details,
                ...res,
              };
              this.usersService.setSelectedUser(response);
              return response;
            })
          );
        })
      );
    }
  }
}
