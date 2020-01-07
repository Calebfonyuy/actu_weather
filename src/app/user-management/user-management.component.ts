import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from '../user/user';
import { AppComponent } from '../app.component';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { IndexedDBComponent } from '../indexed-db/indexed-db.component';
import { dbConfig } from '../configuration/db-config';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})

export class UserManagementComponent implements OnInit {
	public username:string;
	private password:string;
	private debcon:IndexedDBComponent;

	private user:User = new User();
	private app:AppComponent = new AppComponent();
	@Input()
	private signup:boolean;
	@Output()
	private cancel_action = new EventEmitter<Number>();
	@Output()
	private emit_user:EventEmitter<User> = new EventEmitter<User>();


	constructor() { }

	ngOnInit() {
		this.debcon = new IndexedDBComponent(new NgxIndexedDBService(dbConfig))
	}

	public cancelAction(){
		this.cancel_action.emit(5);
	}

	// Save New User
	public signUp(){
		if(this.user.getName() && this.user.getSurname() && this.user.getBirthday() && this.user.getUsername() && this.user.getPassword() && this.user.getSex()){
			if(this.user.getPassword() == this.password){
				this.user.save(this);
			}else{
				alert('Passwords don\'t match');
			}
		}else{
			alert('Fill in all fields');
		}
	}

	//Add id to new user
	public updateNewUser(id){
		this.user.setId(id);
		this.emit_user.emit(this.user);
	}

	public checkPassword(pass:string){
		if(pass==this.password) return true;
		else return false;
	}

	public signIn(){
		this.debcon.signInUser(this);
	}

	// Recreate new User Object from inforomation about user signed in.
	public completSignIn(user:any){
		if(user === null){
			alert("Account Not found");
		}else if(this.password == user['password']){
			var found_user = new User();
			found_user.setId(user.id);
			found_user.setSex(user.sex);
			found_user.setPhoto(user.photo);
			found_user.setName(user.name);
			found_user.setSurname(user.surname);
			found_user.setUsername(user.username);
			found_user.setPassword(user.password);
			found_user.setBirthday(new Date(user.birthday));
			for(var i in user.address){
				found_user.addAddress(user.address[i].town, user.address[i].lattitude, user.address[i].longitude);
			}
			this.user = found_user;
			this.emit_user.emit(found_user);
		}else{
			alert("Wrong Password");
		}
	}
}
