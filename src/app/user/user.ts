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
	private birthday_string:string;
	private sex:string;

	constructor(){
		this.dbase = new IndexedDBComponent(new NgxIndexedDBService(dbConfig))
	}

	public setPhoto(photo){
		this.photo = photo;
	}
	public setName(name:string){
		this.name = name;
	}
	public setSurname(surname:string){
		this.surname = surname;
	}
	public setBirthday(birthday:Date){
		this.birthday = birthday;
		this.birthday_string = ""+this.birthday.getFullYear()+"-"+this.birthday.getMonth()+"-"+this.birthday.getDate();
	}
	public setSex(sex:string){
		if(sex.startsWith("m")||sex.startsWith("M")) this.sex = "Masculine";
		else if(sex.startsWith("f")||sex.startsWith("F")) this.sex = "Feminine";
		else this.sex = "Not Set";
	}

	public setId(id:string){
		this.id = id;
	}
	public setUsername(username:string){
		this.username = username;
	}
	public setPassword(password:string){
		this.password = password;
	}


	public getPhoto(){return this.photo;}
	public getName(){return this.name;}
	public getSurname(){return this.surname;}
	public getBirthday(){return this.birthday;}
	public getBirthdayString(){return this.birthday_string;};
	public getSex(){return this.sex;}
	public getAddress(){return this.active_address.getTown();}
	public getUsername(){return this.username;}
	public getId(){return this.id;}
	public getAllAddresses(){return this.address;}
	public getPassword(){return this.password;}

	public setActiveAddress(index){
		this.active_address = this.address[index];
	}

	public addAddress(addr:string, latitude:number, longitude:number){
		this.address.push(new Address(addr, latitude, longitude));
	}

	public addNewAddress(address:Address){
		this.address.push(address);
	}

	//Save or update current user instance to database
	public save(manager:UserManagementComponent){
		var user = this.createUserObject();
		if(this.id){
			user['id'] = this.id;
			this.dbase.update(user);
		}else{
			this.dbase.adduser(user, manager);
		}
	}

	/*User object is not perfectly serializable hence the need to create this object all the time
	Saving the user.*/
	private createUserObject() {
        var address = [];
        var list = this.getAllAddresses();
        for (var i in list) {
            var add = {};
            add['town'] = list[i].getTown();
            add['latitude'] = list[i].getLattitude();
            add['longitude'] = list[i].getLongitude();
            address.push(add);
        }
        var save_user = {};
        save_user['address'] = address;
        save_user['name'] = this.getName();
		save_user['sex'] = this.getSex();
		save_user['photo']= this.getPhoto();
        save_user['surname'] = this.getSurname();
        save_user['username'] = this.getUsername();
        save_user['password'] = this.getPassword();
		save_user['birthday'] = this.getBirthday();

		return save_user;
    }

	//Delete user from database
	public delete(){
		this.dbase.delete(this.id);
	}
}
