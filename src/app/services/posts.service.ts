import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly selectedPost = new BehaviorSubject<any>(null);
  selectedPost$ = this.selectedPost.asObservable();
  constructor() {}

  get getSelectedPost(): any {
    return this.selectedPost.getValue();
  }

  setSelectedPost(val: any): void {
    this.selectedPost.next(val);
  }
}
