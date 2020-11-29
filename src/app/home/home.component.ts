import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { usersApi } from '../api.constants';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  paginationInfo: any;
  dataSource: MatTableDataSource<any>;
  users: any[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  tableDisplayedColumns = [
    'index',
    'name',
    'email',
    'gender',
    'status',
    'created_at',
    'updated_at',
  ];
  constructor(private http: HttpClient, private usersService: UsersService) {}

  ngOnInit(): void {
    if (this.usersService.getUsers.length) {
      this.users = this.usersService.getUsers;
      this.paginationInfo = this.usersService.getPageInfo;
      this.setTableDataSource(this.users);
    } else {
      this.getUsers();
    }
  }

  paginate(pageNumber: number): void {
    this.getUsers(pageNumber);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUsers(pageNumber: number = 1): void {
    this.http
      .get(`${usersApi}?page=${pageNumber}`)
      .pipe(
        tap((res: any) => {
          this.paginationInfo = res.meta.pagination;
          this.users = res.data;
          this.usersService.setUsers(this.users);
          this.usersService.pageInfo.next(this.paginationInfo);
          this.setTableDataSource(this.users);
        })
      )
      .toPromise();
  }

  setTableDataSource(data: any[]): void {
    this.dataSource = new MatTableDataSource(data);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
}
