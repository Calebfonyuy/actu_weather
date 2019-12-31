import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from '../user/user';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})

export class UserManagementComponent implements OnInit {
	private username:string;
	private password:string;

	private user:User = new User();
	private app:AppComponent = new AppComponent();
	@Input()
	private signup:boolean;
	@Output()
	private cancel_action = new EventEmitter<Number>();
	@Output()
	private emit_user:EventEmitter<User> = new EventEmitter<User>();


	constructor() {  }

	ngOnInit() {
	}

	public cancelAction(){
		this.cancel_action.emit(5);
	}

	public signUp(){
		if(this.user.getName() && this.user.getSurname() && this.user.getBirthday() && this.user.getUsername() && this.user.getPassword() && this.user.getSex()){
			this.user.save();
			console.log(this.user.getId());
			console.log(this.user.getBirthday());
			this.emit_user.emit(this.user);
		}else{
			alert('Fill in all fields');
		}
	}

	public signIn(){
		console.log(this.username);
		//this.emit_user.emit(user);
	}
}
