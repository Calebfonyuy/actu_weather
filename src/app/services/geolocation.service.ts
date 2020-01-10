import { Injectable  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() {

  }

  public async getPosition(position){
	  if(navigator.geolocation){
		  return navigator.geolocation.getCurrentPosition((data)=>{
			  position.latitude = data.coords.latitude;
			  position.longitude = data.coords.longitude;
			  console.log(data);
		  });
	  }
  }
}
