import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { usersApi } from '../api.constants';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  id: number;
  paginationInfo: any;
  dataSource: MatTableDataSource<any>;
  posts: any[];
  user: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  tableDisplayedColumns = ['id', 'title', 'body'];
  subs: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.subs.push(
      this.route.data.subscribe((res) => {
        this.paginationInfo = res.userDetails.meta.pagination;
        this.posts = res.userDetails.data;
        this.user = res.userDetails.details.data;
        this.id = +res.userDetails.id;
        this.setTableDataSource(this.posts);
      })
    );
  }

  paginate(pageNumber: number): void {
    this.getPosts(pageNumber);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getPosts(pageNumber: number = 1): void {
    this.http
      .get(`${usersApi}/${this.id}/posts`)
      .pipe(
        tap((res: any) => {
          this.paginationInfo = res.meta.pagination;
          this.posts = res.data;
          this.setTableDataSource(this.posts);
        })
      )
      .toPromise();
  }

  setTableDataSource(data: any[]): void {
    this.dataSource = new MatTableDataSource(data);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
