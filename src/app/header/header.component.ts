import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../user/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	private action:boolean = false;
	private signup:boolean = false;
	private user:User;
	@Output()
	private address_emitter = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

	// Switch Header Status according to received action values
	public switchAction(type){
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
	}

	public logoutUser(){
		this.user = null;
	}
}
