import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from './user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
	private showmenu:boolean = false;
	private add_addr:boolean = false;
	private editing:boolean = false;
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
