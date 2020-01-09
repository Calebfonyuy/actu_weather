import { Injectable  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() {

  }

  public async getPosition(){
	  var position = {lat:0, long: 0};
	  if(navigator.geolocation){
		  await navigator.geolocation.getCurrentPosition((data)=>{
			  position.lat = data.coords.latitude;
			  position.long = data.coords.longitude;
		  });
	  }
	  return position;
  }
}
