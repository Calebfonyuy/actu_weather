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
	@Input()
	private user:User;
	@Output()
	private logout_event = new EventEmitter<any>();

	constructor() { }

	ngOnInit() {
	}

	toggleMenu(){
		this.showmenu = !this.showmenu;
	}

	toggleAddAddr(){
		this.add_addr = !this.add_addr;
	}

	private addAddress(address:any){
		console.log(address);
		this.new_address.setPosition(address);
	}

	private addUserAddress(){
		if(this.new_address.getTown()){
			console.log(this.new_address);
			console.log(this.user)
			this.user.addNewAddress(this.new_address);
			this.user.save(null);
			this.new_address = new Address(null, null, null);
			this.toggleAddAddr();
		}else{
			alert('Enter town name and select on map');
		}
	}

	switchMode(){
		this.editing = !this.editing;
	}

	private logout(){
		this.logout_event.emit();
	}

	private changAddress(index){
		this.user.setActiveAddress(index);
	}
}
