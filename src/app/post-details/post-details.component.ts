import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { postsApi } from '../api.constants';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit, OnDestroy {
  userId: number;
  postId: number;
  paginationInfo: any;
  dataSource: MatTableDataSource<any>;
  comments: any[];
  user: any;
  post: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  tableDisplayedColumns = ['index', 'name', 'body', 'created_at', 'updated_at'];
  subs: Subscription[] = [];
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.subs.push(
      this.route.data.subscribe((res) => {
        this.paginationInfo = res.postDetails.comments.meta.pagination;
        this.comments = res.postDetails.comments;
        const { postId, userId } = res.postDetails;
        const post = res.postDetails.post.data;
        const user = res.postDetails.user.data;
        this.userId = postId;
        this.userId = userId;
        this.post = post;
        this.user = user;
        this.setTableDataSource(this.comments);
      })
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  paginate(pageNumber: number): void {
    this.getComments(pageNumber);
  }

  getComments(pageNumber: number = 1): void {
    this.http
      .get(`${postsApi}/${this.postId}/comments`)
      .pipe(
        tap((res: any) => {
          this.paginationInfo = res.meta.pagination;
          this.comments = res.data;
          this.setTableDataSource(this.comments);
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
