import { Component, OnInit } from '@angular/core';
import { GeolocationService } from './services/geolocation.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Actu Weather';
  address = 'Melen';
  private loggedIn:boolean = false;

  constructor(private locator: GeolocationService){}

  ngOnInit(){
	  this.locator.getPosition().then((data)=>{
		  console.log(data);
	  })
  }

  private updateAppStatus(){
	 this.loggedIn = !this.loggedIn;
  }
}
