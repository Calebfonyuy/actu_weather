import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { User } from '../user/user';
import { Address } from '../user/address';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
	private action:boolean = false;
	private signup:boolean = false;
	private user:User;
	@Output()
	private status_emitter = new EventEmitter<any>();
	private logo:any="app/img/logo.png";
	private type:number = -1;
	@Output()
	private emit_address:EventEmitter<Address> = new EventEmitter<Address>();

  constructor() { }

  ngOnInit() {
  }
	// Switch Header Status according to received action values
	public switchAction(type){
		if(this.action&&type==this.type){
			this.action = false;
			return;
		}
		this.type = type;
		this.signup = false;
		this.action = !this.action;
		switch(type){
			case 1:
				this.action = true;
				this.signup = false;
				break;
			case 2:
				this.action = true;
				this.signup = true;
				break;
			default:
				this.action = false;
		}
	}

	// change current User object
	public updateUser(nuser:User){
		this.user = nuser;
		this.action = false;
		this.status_emitter.emit();
	}

	public logoutUser(){
		this.user = null;
		this.status_emitter.emit();
	}

	public updateWeatherAddress(address:Address){
		this.emit_address.emit(address);
	}
}
