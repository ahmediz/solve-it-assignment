import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostDetailsResolver } from './resolvers/post-details.resolver';
import { UserDetailsResolver } from './resolvers/user-details.resolver';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  {
    path: 'users',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'users/:id',
    component: UserDetailsComponent,
    resolve: {
      userDetails: UserDetailsResolver,
    },
  },
  {
    path: 'users/:id/posts/:postId',
    component: PostDetailsComponent,
    resolve: {
      postDetails: PostDetailsResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
