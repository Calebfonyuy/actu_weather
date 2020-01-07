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
    public units : string ='metric';
    public forecast_data : weather_data[] = []; 
    public date: string;
    public  API_KEY:string ="33d32c6a2760f1561d57c0f8229f0a6a";
    public URL: string ="http://api.openweathermap.org/data/2.5/"
    param_weather = new HttpParams()
          .set('lat',this.latitude.toString())
          .set('lon', this.longitude.toString())
          .set('APPID',this.API_KEY)
          .set('units',this.units );

  constructor(private http: HttpClient) { 

  }

  getData(request_type){
     let req  = this.URL+request_type;
    
    this.http.get(req ,{responseType:'json', params: this.param_weather}).subscribe((res:any) => {
      if (request_type == "weather")
    {
      this.donnee.city_name=res.name;
      this.donnee.country_cod=res.sys.country;
      this.donnee.humidity=res.main.humidity;
      this.donnee.latitude=res.coord.lat;
      this.donnee.longitude= res.coord.lon;
      this.donnee.pressure= res.main.pressure;
      this.donnee.temperature = res.main.temp;
      this.donnee.weather_description = res.weather[0].description;
      this.donnee.weather_main=res.weather[0].main;
      this.donnee.wind_degree= res.wind.degree;
      this.donnee.wind_speed=res.wind.speed;
      this.donnee.id_icon = res.weather[0].icon;
      
    }else if(request_type="forecast"){
      console.log(res);

      for (var i=0; i < res.cnt; i++ )
      {
        let fore_data_temp = new weather_data();
        fore_data_temp.city_name=res.city.name;
        fore_data_temp.latitude=res.city.coord.lat;
        fore_data_temp.longitude= res.city.coord.lon;
  
        fore_data_temp.country_cod=res.city.country;

        fore_data_temp.humidity=res.list[i].main.humidity;
        fore_data_temp.pressure= res.list[i].main.pressure;
        fore_data_temp.temperature = res.list[i].main.temp;
        fore_data_temp.weather_description = res.list[i].weather[0].description;
        fore_data_temp.weather_main=res.list[i].weather[0].main;
        fore_data_temp.wind_degree= res.list[i].wind.degree;
        fore_data_temp.wind_speed=res.list[i].wind.speed;
        fore_data_temp.id_icon = res.list[i].weather[0].icon;
        fore_data_temp.dt = res.list[i].dt_txt;

        this.forecast_data.push(fore_data_temp);
      }

    }
     
  });
  
}
    get_namedate(dt_txt){
      let date=  new Date(dt_txt.split(" ")[0]);
      let tab_jour=new Array("Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi");
      return tab_jour[date.getDay()];
    }
    get_heure(dt_txt){
      return dt_txt.split(" ")[1];

    }

  ngOnInit() {
    //this.getData("weather");
    //this.getData("forecast");
    let dt_txt= "2020-01-06 21:00:00";
    
    this.date = this.get_namedate(dt_txt);
  }

}
