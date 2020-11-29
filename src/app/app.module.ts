import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { HomeComponent } from './home/home.component';
import { UserDetailsComponent } from './user-details/user-details.component';

// Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TruncatePipe } from './pipes/truncate.pipe';
import { PostDetailsComponent } from './post-details/post-details.component';
import { UserDetailsResolver } from './resolvers/user-details.resolver';
import { PostDetailsResolver } from './resolvers/post-details.resolver';

@NgModule({
  declarations: [AppComponent, HomeComponent, UserDetailsComponent, TruncatePipe, PostDetailsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule
  ],
  providers: [UserDetailsResolver, PostDetailsResolver],
  bootstrap: [AppComponent],
})
export class AppModule {}
