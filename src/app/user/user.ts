import { Address } from './address';

export class User {
	private address:Address[] = new Array<Address>();//List of all addresses associated with user
	private active_address:Address;
	constructor(private photo:string,
  			  private name:string,
  			  private surname:string,
  			  private birthday:Date,
  			  private sex:string){

	}

	public set photo(photo){
		this.photo = photo;
	}
	public set name(name){
		this.name = name;
	}
	public set surname(surname){
		this.surname = surname;
	}
	public set birthday(birthday:Date){
		this.birthday = birthday;
	}
	public set sex(sex){
		if(sex.startsWith("masc")) this.sex = "Masculin";
		else if(sex.startsWith("fem")) this.sex = "Feminine";
		else this.sex = "Not Set";
	}

	public get photo(){return this.photo;}
	public get name(){return this.name;}
	public get surname(){return this.surname;}
	public get birthday(){return this.birthday.toDateString();}
	public get sex(){return this.sex;}
	public get address(){return this.active_address.town;}

	public setActiveAddress(index){
		this.active_address = this.address[index];
	}

	public addAddress(addr){
		this.address.push(new Address(addr));
	}

	public save(){

	}

	public delete(){

	}
}
