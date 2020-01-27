import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser'
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { InjectionToken } from '@angular/core'
import { MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//APP
//Components
import { HomeComponent } from './home.component';
import { MenuComponent } from './shared/menu.component';
import { PageNotFoundComponent } from './shared/page-not-found.component';
import { APP_DI_CONFIG } from './shared/app.config';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register.component';
import { LoginComponent } from './auth/login.component';

//Services
import { UserService } from './shared/user.service';
import { CatalogService } from './shared/catalog.service';
import { AuthenticationService } from './auth/authentication.service';

//Modules
import { AppRoutingModule } from './app-routing.module';
import { InvestModule } from './invest/invest.module';
import { JwtInterceptor } from './auth/jwt.interceptor';

export let APP_CONFIG = new InjectionToken('app.config');

@NgModule({
    imports: [
      BrowserModule,
      ReactiveFormsModule,
      HttpClientModule,
        FormsModule,
        NgbModule.forRoot(),
        MatButtonModule,
      InvestModule,
      BrowserAnimationsModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        PageNotFoundComponent,
        RegisterComponent,
      LoginComponent,
      MenuComponent
        ],
    bootstrap: [AppComponent],
    providers: [
      NgbActiveModal,
      UserService,
      CatalogService,
      AuthenticationService,
      { provide: APP_CONFIG, useValue: APP_DI_CONFIG },
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ],
    entryComponents: [ ]
    
})
export class AppModule { }
