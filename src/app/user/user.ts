import { Address } from './address';

export class User {
	private address:Address[] = new Array<Address>();//List of all addresses associated with user
	private active_address:Address;
	private username:string;
	private password:string;

	constructor(private photo:string,
  			  private name:string,
  			  private surname:string,
  			  private birthday:Date,
  			  private sex:string){

	}

	public setPhoto(photo){
		this.photo = photo;
	}
	public setName(name){
		this.name = name;
	}
	public setSurname(surname){
		this.surname = surname;
	}
	public setBirthday(birthday:Date){
		this.birthday = birthday;
	}
	public setSex(sex){
		if(sex.startsWith("masc")) this.sex = "Masculin";
		else if(sex.startsWith("fem")) this.sex = "Feminine";
		else this.sex = "Not Set";
	}

	public setUsername(username){
		this.username = username;
	}
	public setPassword(password){
		this.password = password;
	}

	public getPhoto(){return this.photo;}
	public getName(){return this.name;}
	public getSurname(){return this.surname;}
	public getBirthday(){return this.birthday.toDateString();}
	public getSex(){return this.sex;}
	public getAddress(){return this.active_address.getTown();}
	public getUsername(){return this.username;}

	public setActiveAddress(index){
		this.active_address = this.address[index];
	}

	public addAddress(addr){
		this.address.push(new Address(addr));
	}

	public authenticate(username, password){
		if(username == this.username){
			if(password==this.password){
				return true;
			}
		}
		return false;
	}

	public save(){

	}

	public delete(){

	}
}
