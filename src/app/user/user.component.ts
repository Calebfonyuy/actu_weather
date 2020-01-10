import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from './user';
import { Address } from './address';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
	private showmenu:boolean = false;
	private add_addr:boolean = false;
	private editing:boolean = false;
	private new_address:Address = new Address(null, null, null);
	private name:string;
	private surname:string;
	private sex:string;
	private birthday:string;
	private username:string;
	private password:string;
	private password2:string;
	private map_message:string = "";
	@Input()
	private user:User;
	@Output()
	private logout_event = new EventEmitter<any>();
	@Output()
	private emit_address:EventEmitter<Address> = new EventEmitter<Address>();

	constructor() { }

	ngOnInit() {
	}

	private copyValues(){
		this.name = this.user.getName();
		this.surname = this.user.getSurname();
		this.sex = this.user.getSex();
		this.birthday = this.user.getBirthdayString();
		this.username = this.user.getUsername();
		this.password = this.user.getPassword();
		this.password2 = this.user.getPassword();
		console.log("User values copied");
	}

	// Switch User Menu from hidden to showing and vice versa
	toggleMenu(){
		this.showmenu = !this.showmenu;
	}

	//Show or hide New Address Box
	toggleAddAddr(){
		this.add_addr = !this.add_addr;
	}

	//Add new Address
	private addAddress(address:any){
		this.new_address.setTown(address[1]);
		this.new_address.setPosition(address[0]);
	}

	//Add the validated address to User
	private addUserAddress(){
		if(this.new_address.getTown()){
			this.user.addNewAddress(this.new_address);
			this.user.save(null);
			this.user.setActiveAddress(this.user.getAllAddresses().length-1);
			this.updateWeatherAddress();
			this.new_address = new Address(null, null, null);
			this.toggleAddAddr();
			this.map_message = "";
		}else{
			this.map_message='Enter town name and select on map';
		}
	}

	switchMode(){
		this.editing = !this.editing;
		if(this.editing){
			this.copyValues();
		}
	}

	private logout(){
		this.logout_event.emit();
	}

	//Switch Active user address
	private changAddress(index){
		this.user.setActiveAddress(index);
		this.updateWeatherAddress();
	}

	private deleteAddress(index){
		this.user.removeAddress(index);
		this.user.save(null);
	}

	private updateUser(){
		if(this.password != this.password2){
			alert("Passwords don't correspond");
			return false;
		}
		this.user.setName(this.name);
		this.user.setSurname(this.surname);
		this.user.setSex(this.sex);
		this.user.setBirthday(new Date(this.birthday));
		this.user.setPassword(this.password);
		this.user.setUsername(this.username);
		this.user.save(null);
		this.editing = false;
		console.log("User Updated");
	}

	private async changePhoto(event){
		if(event.target.files.length>0){
			var file_data = await toBase64(event.target.files[0]);
			this.user.setPhoto(file_data);
			this.user.save(null);
		}
	}

	public updateWeatherAddress(){
		this.emit_address.emit(this.user.getActiveAddress());
	}
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});
