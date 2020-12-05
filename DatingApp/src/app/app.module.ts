import { UserService } from './_services/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AlertifyService } from './_services/alertify.service';
import { JwtModule, JwtModuleOptions } from "@auth0/angular-jwt";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver.service';
import { MemberListResolver } from './_resolvers/member-list.resolver.service';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver.service';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';


export function tokenGetter() {
  return localStorage.getItem("access_token");  
}

const JWT_Module_Options: JwtModuleOptions = {
  config: {
      tokenGetter: tokenGetter,
      allowedDomains: [],
  }};

@NgModule({
  declarations: [							
    AppComponent,
      ValueComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MemberListComponent,
      ListsComponent,
      MessagesComponent,
      MemberCardComponent,
      MemberDetailComponent,
      MemberEditComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot(JWT_Module_Options),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    NgxGalleryModule

  ],
  providers: [
    AuthService, 
    UserService,
     AlertifyService, 
     AuthGuard,
     PreventUnsavedChanges,
      MemberDetailResolver,
      MemberListResolver,
      MemberEditResolver
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
