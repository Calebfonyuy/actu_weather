export class Address {
	constructor(private town:String, private lattitude:number, private longitude:number){

	}

	public setTown(town){
		this.town = town;
	}

	public getTown(){
		return this.town;
	}

	public getLattitude(){
		return this.lattitude;
	}

	public getLongitude(){
		return this.longitude;
	}

	public setPosition(position){
		this.lattitude = position.lat;
		this.longitude = position.lng;
	}
}
