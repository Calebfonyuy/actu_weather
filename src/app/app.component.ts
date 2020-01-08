import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Actu Weather';
  address = 'Melen';
  private loggedIn:boolean = false;

  private updateAppStatus(){
	 this.loggedIn = !this.loggedIn;
  }
}
