import { Component, OnInit } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { UserManagementComponent } from '../user-management/user-management.component';

@Component({
  selector: 'app-indexed-db',
  templateUrl: './indexed-db.component.html',
  styleUrls: ['./indexed-db.component.css']
})
export class IndexedDBComponent implements OnInit {
  constructor( private dbService : NgxIndexedDBService) {
    dbService.currentStore ='user';
       }

       // cette methode enregistre un utilisateur dans la base de données on lui fournit l'objet sous forme de dictionnaire {index : valeur}
  adduser(user : any, manager:UserManagementComponent) {
    this.dbService.add(user).then(
       id=>manager.updateNewUser(id),
        error =>{
          console.log("erreur d'enregistrement");
        }
      );
  }

         // cette methode modifie les paramètres d'un utilisateur dans la base de données on lui fournit l'objet sous forme de dictionnaire {index : valeur}
  update(usertoUpdate : any) {
	  console.log(usertoUpdate);
     this.dbService.update(usertoUpdate).then(
      ()=>{
         console.log('Informations modify successfully');
       },
       error =>{
         console.log(error);
       }
     );
  }


    // cette methode supprime un utilisateur dans la base de données on lui fournit l'identifieur ou la clé correspondante à cet utiilisateur
  delete( key : number) {
  this.dbService.delete (key).then(
    ()=>{
       console.log('user delete successfully');
     },
     error =>{
       console.log(error);
     }
   );
}

    // cette methode retourne un utilisateur à partir de sa clé
getUserByKey(key : number) {
  this.dbService.getByKey(key).then(
    user =>{
      console.log(user);
    },
    error=>{
      console.log(error);
    },
  )

}
getAlluser(){
  this.dbService.getAll().then(
    user=> {
        console.log(user);
    },
    error => {
        console.log(error);
    }
);
}



  ngOnInit() {
  }

	public signInUser(manager:UserManagementComponent){
		this.dbService.getAll().then(
			users => {
				var found_user = null;
				for(var i in users){
					var user = users[i];
					if(user['username'] == manager.username.trim()){
						found_user = user;
						break;
					}
				}
				manager.completSignIn(found_user);
			},
			error =>{
				console.log("Error loading all users");
			}
		);
	}
}
