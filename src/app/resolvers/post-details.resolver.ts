import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { postsApi, usersApi } from '../api.constants';
import { PostsService } from '../services/posts.service';

@Injectable({
  providedIn: 'root',
})
export class PostDetailsResolver implements Resolve<boolean> {
  constructor(private http: HttpClient, private postsService: PostsService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const userId = route.paramMap.get('id');
    const postId = route.paramMap.get('postId');
    const selectedPost = this.postsService.getSelectedPost;
    if (selectedPost && selectedPost.postId === postId) {
      return this.postsService.selectedPost$.pipe(
        take(1),
        map((res) => res)
      );
    } else {
      return this.http.get(`${usersApi}/${userId}`).pipe(
        switchMap((user: any) => {
          const getPost = this.http.get(`${postsApi}/${postId}`);
          const getComments = this.http.get(`${postsApi}/${postId}/comments`);
          return forkJoin([getPost, getComments]).pipe(
            map(([post, comments]) => {
              const response = {
                userId,
                postId,
                user,
                post,
                comments,
              };
              this.postsService.setSelectedPost(response);
              return response;
            })
          );
        })
      );
    }
  }
}
