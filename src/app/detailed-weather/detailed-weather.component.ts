import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { current_data } from './../weather/current_data';
import {weather_data} from './../weather/weather_data'
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-detailed-weather',
  templateUrl: './detailed-weather.component.html',
  styleUrls: ['./detailed-weather.component.css']
})
export class DetailedWeatherComponent implements OnInit, OnChanges {
	@Input()
	public latitude :number;
	@Input()
	public longitude : number;
	public units : string ='metric';
	public  API_KEY:string ="33d32c6a2760f1561d57c0f8229f0a6a";
	public URL: string ="http://api.openweathermap.org/data/2.5/";

	public forecast_data : weather_data[] = [];
	public hourly_data : current_data[]=[];
	public weekly_data : current_data[]= [];
	public day_data =new Array();
	public day_details = []
	private param_weather:HttpParams;

  hourHidden: boolean = false
  dayHidden: boolean = true
  detailsHidden: boolean = true
  detailsName: String


  constructor(private http: HttpClient) { }

  onHourDisplay(){
    this.dayHidden = true
    this.hourHidden = false
    this.detailsHidden = true
  }

  onDayDisplay() {
    this.hourHidden = true
    this.dayHidden = false
    this.detailsHidden = true
  }

  dayIndex(day){
    let i
    for (let index = 0; index < this.weekly_data.length; index++) {
      if(day.name == this.weekly_data[index].name){
        i = index
      }
    }
    return i
  }

  onDayData(day) {
    this.day_details = this.day_data[this.dayIndex(day)]
    this.detailsHidden = false;
    this.detailsName = day.name
  }


  getData(request_type){
    let req  = this.URL+request_type;

   this.http.get(req ,{responseType:'json', params: this.param_weather}).subscribe((res:any) => {
      if(request_type == "forecast"){
        for (var i=0; i < res.cnt; i++ ){
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
   fill_data(forecast_data){
    this.hourly_data= [];
    this.weekly_data= [];
     for(var i=0;i<8; i++){

         let hourly_data_temp = new current_data();

         if(i==0){
           hourly_data_temp.name = "Today "+this.get_heure(forecast_data[i].dt) ;
         }
         else if((i!=0)&&(this.get_namedate(forecast_data[i-1].dt)!=this.get_namedate(forecast_data[i].dt))){
           hourly_data_temp.name = "Tomorrow "+this.get_heure(forecast_data[i].dt) ;
         }else{
           hourly_data_temp.name = this.get_heure(forecast_data[i].dt) ;
         }


         hourly_data_temp.img_url=this.get_image_icon(forecast_data[i].id_icon) ;
         hourly_data_temp.temperature.push(forecast_data[i].temperature);

         hourly_data_temp.humidity.push(forecast_data[i].humidity);

         hourly_data_temp.wind_speed.push(forecast_data[i].wind_speed);

         this.hourly_data.push(hourly_data_temp);


       }
     let day: number[] = [];
     let val: number = 0;

     for (var i=1; i < forecast_data.length; i++ ){

       if(this.get_namedate(forecast_data[i-1].dt) == this.get_namedate(forecast_data[i].dt)){
         val++;
       }
       else{
         day.push(val+1);
         val=0;
       }
     }
     day.push(val+1)
     let t: number = 0;

     for(var i=0; i<day.length; i++){
       let hourly_day_data: current_data[]=[] ;
       let weekly_data_temp = new current_data();
       let temp_min: number= forecast_data[i].temperature;
       let temp_max: number= forecast_data[i].temperature;
       let humidity_min: number = forecast_data[i].humidity;
       let humidity_max: number= forecast_data[i].humidity;
       let wind_speed_min: number = forecast_data[i].wind_speed;
       let wind_speed_max: number= forecast_data[i].wind_speed;
       let id_icon_temp: string;



    let a : number=0;

       weekly_data_temp.name = this.get_namedate(forecast_data[t].dt);
       for(var j= t; j<t+day[i];j++){

         let hourly_day_data_temp = new current_data();
         hourly_day_data_temp.name=this.get_heure(forecast_data[j].dt);
         hourly_day_data_temp.humidity= forecast_data.humidity;
         hourly_day_data_temp.temperature= forecast_data[j].temperature;
         hourly_day_data_temp.wind_speed = forecast_data[j].wind_speed;
         hourly_day_data_temp.img_url = this.get_image_icon(forecast_data[j].id_icon);

         if(forecast_data[j].temperature >temp_max){
           temp_max=forecast_data[j].temperature;
           id_icon_temp=forecast_data[j].id_icon;
         }
         if(forecast_data[j].temperature <temp_min){
           temp_min=forecast_data[j].temperature;
         }
         if(forecast_data[j].humidity >humidity_max){
           humidity_max=forecast_data[j].humidity;
         }
         if(forecast_data[j].humidity <humidity_min){
           humidity_min=forecast_data[j].humidity;
         }
         if(forecast_data[j].wind_speed >wind_speed_max){
          wind_speed_max=forecast_data[j].wind_speed;
        }
        if(forecast_data[j].wind_speed <wind_speed_min){
          wind_speed_min=forecast_data[j].wind_speed
        }
         a++;
         hourly_day_data.push(hourly_day_data_temp);


       }
       t=t+a;

       weekly_data_temp.humidity.push(humidity_min);
       weekly_data_temp.humidity.push(humidity_max);
       weekly_data_temp.temperature.push(temp_min);
       weekly_data_temp.temperature.push(temp_max);
       weekly_data_temp.img_url= this.get_image_icon(id_icon_temp);
       this.weekly_data.push(weekly_data_temp);
       this.day_data.push(hourly_day_data);
     }
     this.weekly_data.shift()
     this.day_data.shift()
  }

  ngOnInit() {
	  this.param_weather = new HttpParams()
	  .set('lat',this.latitude.toString())
	  .set('lon', this.longitude.toString())
	  .set('APPID',this.API_KEY)
	  .set('units',this.units );
    this.getData("forecast");
    setTimeout(() => {
      this.fill_data(this.forecast_data)
    }, 2000)
  }

  ngOnChanges(changes: SimpleChanges): void {
	  
	  this.param_weather = new HttpParams()
	  .set('lat',this.latitude.toString())
	  .set('lon', this.longitude.toString())
	  .set('APPID',this.API_KEY)
	  .set('units',this.units );
    this.getData("forecast");
    setTimeout(() => {
      this.fill_data(this.forecast_data)
    }, 2000)
  }
}
