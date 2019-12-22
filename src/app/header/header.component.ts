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

	public updateUser(nuser:User){
		this.user = nuser;
		this.action = false;
	}

	public logoutUser(){
		this.user = null;
	}
}
