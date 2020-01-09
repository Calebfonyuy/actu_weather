import { Component, OnInit, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { weather_data } from './weather_data';
import { HttpClient, HttpParams } from '@angular/common/http';
import { current_data } from './current_data';




@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit , OnChanges{
	@Input()
    public latitude:number;
	@Input()
    public longitude : number;
    public units : string ='metric';
    public  API_KEY:string ="fd72a2992d88918120ba4c7b6ab8c481";
    public URL: string ="http://api.openweathermap.org/data/2.5/";
	private param_weather:HttpParams;
	donnee = new weather_data();

  constructor(private http: HttpClient) {

  }
  ngOnInit() {
	  this.initializeParams();
	this.getData("weather");
  }

  ngOnChanges(changes: SimpleChanges): void {
	  this.initializeParams();
	  this.getData('weather');
  }

  public initializeParams(){
	  this.param_weather = new HttpParams()
            .set('lat',this.latitude.toString())
            .set('lon', this.longitude.toString())
            .set('APPID',this.API_KEY)
            .set('units',this.units );
  }

  public updateWeather(lat:number, long:number){
	  console.log(lat, long);
	  // this.latitude = lat;
	  // this.longitude = long;
	  // this.initializeParams();
	  // this.getData('weather');
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
    }

  });

}
    get_namedate(dt_txt){
      let date=  new Date(dt_txt.split(" ")[0]);
      let tab_jour=new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
      return tab_jour[date.getDay()];
    }
    get_heure(dt_txt){
      return dt_txt.split(" ")[1];

    }
    get_image_icon(id_icon){
      return "http://openweathermap.org/img/wn/"+id_icon+"@2x.png"
    }

    updater(){
      setInterval(function(){
        this.getData("weather");
      },600000);
    }

}
