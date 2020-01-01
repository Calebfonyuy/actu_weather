import { Address } from './address';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { IndexedDBComponent } from '../indexed-db/indexed-db.component';
import { dbConfig } from '../configuration/db-config';
import { UserManagementComponent } from '../user-management/user-management.component';

export class User {
	private id:any;
	private address:Address[] = new Array<Address>();//List of all addresses associated with user
	private active_address:Address;
	private username:string;
	private password:string;
	private dbase:IndexedDBComponent;
	private photo:string;
	private name:string;
	private surname:string;
	private birthday:Date;
	private sex:string;

	constructor(){
		this.dbase = new IndexedDBComponent(new NgxIndexedDBService(dbConfig))
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

	public setId(id){
		this.id = id;
	}
	public setUsername(username){
		this.username = username;
	}
	public setPassword(password){
		this.password = password;
	}

	public getPassword(){
		return this.password;
	}

	public getPhoto(){return this.photo;}
	public getName(){return this.name;}
	public getSurname(){return this.surname;}
	public getBirthday(){return this.birthday;}
	public getSex(){return this.sex;}
	public getAddress(){return this.active_address.getTown();}
	public getUsername(){return this.username;}
	public getId(){return this.id;}

	public setActiveAddress(index){
		this.active_address = this.address[index];
	}

	public addAddress(addr, latitude, longitude){
		this.address.push(new Address(addr, latitude, longitude));
	}

	public addNewAddress(address:Address){
		this.address.push(address);
	}

	//Save or update current user instance to database
	public save(manager:UserManagementComponent){
		if(this.id){
			this.dbase.update(this);
		}else{
			this.dbase.adduser(this, manager);
		}
	}

	//Delete user from database
	public delete(){
		this.dbase.delete(this.id);
	}
}
