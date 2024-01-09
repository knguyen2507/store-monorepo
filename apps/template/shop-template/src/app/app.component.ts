import { Component, OnInit } from '@angular/core';
import { environment } from '@store-monorepo/template/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    console.log(`environment:::`, environment);
    return;
  }
}
