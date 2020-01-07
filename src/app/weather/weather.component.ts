import { Component, OnInit } from '@angular/core';
import { weather_data } from './weather_data';
import { HttpClient, HttpParams } from '@angular/common/http';
import { current_data } from './current_data';

	


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
    public  API_KEY:string ="33d32c6a2760f1561d57c0f8229f0a6a";
    public URL: string ="http://api.openweathermap.org/data/2.5/";

    public forecast_data : weather_data[] = []; 
    public hourly_data : current_data[]=[];
    public weekly_data : current_data[]= [];
   
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
    get_image_icon(id_icon){
      return "http://openweathermap.org/img/wn/"+id_icon+"@2x.png"
    }
    updater(){
      setInterval(function(){
        this.getData("weather");
      },600000);
    }
    fill_data(){
      
      for(var i=0;i<0; i++){
        

          let hourly_data_temp = new current_data();

          if(i==0){
            hourly_data_temp.name = "Aujourd'hui"+this.get_heure(this.forecast_data[i].dt) ;
          }
          else if((i!=0)&&(this.get_namedate(this.forecast_data[i-1].dt)!=this.get_namedate(this.forecast_data[i].dt))){
            hourly_data_temp.name = "Demain"+this.get_heure(this.forecast_data[i].dt) ;
          }else{
            hourly_data_temp.name = this.get_heure(this.forecast_data[i].dt) ;
          }

          
          hourly_data_temp.img_url=this.get_image_icon(this.forecast_data[i].id_icon) ;
          hourly_data_temp.temperature.push(this.forecast_data[i].temperature);
  
          hourly_data_temp.humidity.push(this.forecast_data[i].humidity);
  
          //current_data_temp.rainfall=this.forecast_data[i].;
          
          this.hourly_data.push(hourly_data_temp);

          
        }
      let day: number[] = [];
      let val: number = 0;

      for (var i=1; i < this.forecast_data.length; i++ ){
        if(this.get_namedate(this.forecast_data[i-1].dt)==this.get_namedate(this.forecast_data[i].dt)){
          val++;
        }
        else{
          day.push(val+1);
          val=0;
        }
        
      }
      let t: number = 0;

      for(var i=0; i<day.length; i++){
        let weekly_data_temp: current_data;
        let temp_min: number= this.forecast_data[i].temperature;
        let temp_max: number= this.forecast_data[i].temperature;
        let humidity_min: number = this.forecast_data[i].humidity;
        let humidity_max: number= this.forecast_data[i].humidity;
        let id_icon_temp: string;
        
        weekly_data_temp.name= this.get_namedate(this.forecast_data[i].dt);

        for(var j= t; j<t+day[i];j++){
          if(this.forecast_data[j].temperature >temp_max){
            temp_max=this.forecast_data[j].temperature;
            id_icon_temp=this.forecast_data[j].id_icon;
          }
          if(this.forecast_data[j].temperature <temp_min){
            temp_max=this.forecast_data[j].temperature;
          }
          if(this.forecast_data[j].humidity >humidity_max){
            humidity_max=this.forecast_data[j].humidity;
          }
          if(this.forecast_data[j].humidity <humidity_min){
            humidity_max=this.forecast_data[j].humidity;
          }
          t++;
        }

        weekly_data_temp.humidity.push(humidity_min);
        weekly_data_temp.humidity.push(humidity_max);
        weekly_data_temp.temperature.push(temp_min);
        weekly_data_temp.temperature.push(temp_max);
        weekly_data_temp.img_url= this.get_image_icon(id_icon_temp);
        this.weekly_data.push(weekly_data_temp);
      }
        

    }
      
    

  ngOnInit() {
    //this.getData("weather");
    //this.getData("forecast");
   
  }

}
