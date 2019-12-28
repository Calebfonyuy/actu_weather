import { Component, OnInit } from '@angular/core';
import { weather_data } from './weather_data';
import { HttpClient, HttpParams } from '@angular/common/http';




@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

   donnee = new weather_data();
    public latitude :number = 35;
    public longitude : number = 100;
    public units : string ='metric'
    public  API_KEY:string ="33d32c6a2760f1561d57c0f8229f0a6a";
    public URL: string ="http://api.openweathermap.org/data/2.5/"
    param_weather = new HttpParams()
          .set('lat',this.latitude.toString())
          .set('lon', this.longitude.toString())
          .set('APPID',this.API_KEY)
          .set('units',this.units );

  constructor(private http: HttpClient) { }

  getData(request_type){
    if (request_type == "weather")
    {
    let req  = this.URL+request_type;
    this.http.get(req ,{responseType:'json', params: this.param_weather}).subscribe(res => {
      // this.donnee.city_name=res.name;
      // this.donnee.country_cod=res.sys.country;
      // this.donnee.humidity=res.main.humidity;
      // this.donnee.latitude=res.coord.lat;
      // this.donnee.longitude= res.coord.lon;
      // this.donnee.pressure= res.main.pressure;
      // this.donnee.temperature = res.main.temp;
      // this.donnee.weather_description = res.weather[0].description;
      // this.donnee.weather_main=res.weather[0].main;
      // this.donnee.wind_degree= res.wind.degree;
      // this.donnee.wind_speed=res.wind.speed;
  });
  }
}

  ngOnInit() {
    //this.getData("weather");
  }

}
