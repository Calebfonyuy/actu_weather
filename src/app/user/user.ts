import { Address } from './address';

export class User {
	private address:Address[] = new Array<Address>();//List of all addresses associated with user
	private active_address:Address;
	constructor(private photo :string,
  			  private name:string,
  			  private surname:string,
  			  private birthday:Date,
  			  private sex:string){

	}

	public setphoto(photo){
		this.photo = photo;
	}
	public setname(name){
		this.name = name;
	}
	public setsurname(surname){
		this.surname = surname;
	}
	public setbirthday(birthday:Date){
		this.birthday = birthday;
	}
	public setsex(sex){
		if(sex.startsWith("masc")) this.sex = "Masculin";
		else if(sex.startsWith("fem")) this.sex = "Feminine";
		else this.sex = "Not Set";
	}

	public getphoto(){return this.photo;}
	public getname(){return this.name;}
	public getsurname(){return this.surname;}
	public getbirthday(){return this.birthday.toDateString();}
	public getsex(){return this.sex;}
	public getaddress(){return this.active_address.town;}

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
