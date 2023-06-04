import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HealthCheckComponent } from './utils/health-check/health-check.component';
import { MatIconModule } from '@angular/material/icon';
import { TokenIntercepterService } from './utils/token-intercepter.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { GenericTableComponent } from './generic-table/generic-table.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { JsonDiffModalComponent } from './json-diff-modal/json-diff-modal.component';
import { JsonBeautifyPipe } from './utils/json-beautify-pipe';
import { SafeHtmlPipe } from './utils/safe-html-pipe';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HealthCheckComponent,
    
    GenericTableComponent,
    DashboardComponent,
    LoginComponent,
    AppComponent,
    NavbarComponent,
    HealthCheckComponent,
    LoginComponent,
    JsonDiffModalComponent,
    JsonBeautifyPipe,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // NgbModule,
    MatProgressBarModule,
    AppRoutingModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonToggleModule,
    MatButtonModule,
    HttpClientModule,
    MatSnackBarModule,
    MatChipsModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatDialogModule,
    MatSelectModule
  ], providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenIntercepterService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
