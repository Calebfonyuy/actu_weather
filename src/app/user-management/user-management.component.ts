import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../user/user';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})

export class UserManagementComponent implements OnInit {
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

	}

	public signIn(){
		var user:User = new User('pic', 'Caleb', 'Fonyuy', new Date(),'Masculin');
		user.addAddress("Melen");
		user.addAddress("Molyko");
		user.addAddress("Bamenda");
		user.addAddress("Buea");
		user.addAddress("Douala");
		user.setActiveAddress(1);
		this.emit_user.emit(user);
	}
}
