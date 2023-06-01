import { Component } from '@angular/core';
import { LoadingService } from './service/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud-panel';
  loading: boolean;

  constructor(private loadingService: LoadingService) {
    this.loadingService.loading$.subscribe((isLoading) => {
      this.loading = isLoading;
    });
  }

}
