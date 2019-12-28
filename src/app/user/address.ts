export class Address {
	constructor(private town:String, private lattitude:number, private longitude:number){

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
}
