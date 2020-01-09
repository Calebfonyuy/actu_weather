import { Component, OnInit } from '@angular/core';
import { GeolocationService } from './services/geolocation.service';
import { WeatherComponent } from './weather/weather.component';
import { HttpClient } from '@angular/common/http';
import { Address } from './user/address';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Actu Weather';
  address = 'Melen';
  private loggedIn:boolean = false;
  private weather:WeatherComponent;
  private latitude:number = 3.8576127999999996;
  private longitude:number = 11.513855999999999;

  constructor(private locator: GeolocationService, private client: HttpClient){}

  ngOnInit(){
	  this.initializeWeather();
	  this.weather.initializeParams();
	  this.weather.getData('weather');
  }

  private async initializeWeather(){
	  this.weather = new WeatherComponent(this.client);
	  this.weather.latitude = this.latitude;
	  this.weather.longitude = this.longitude;
	  //await this.locator.getPosition(this.weather);
  }

  private updateAppStatus(){
	 this.loggedIn = !this.loggedIn;
  }

	private updateWeatherAddress(address:Address){
		this.latitude = address.getLattitude();
		this.longitude = address.getLongitude();
	}
}
