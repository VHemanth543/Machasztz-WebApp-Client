import { Component, OnInit } from '@angular/core';
import { ConnectionServiceService } from '../services/connection-service.service';




export interface userFormate{
  firstName : String,
  lastName : String,
  email : String,
  password : String,
  userName : String,

}

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnInit {

  first_name : string =""; last_name : string = ""; user_name : string = ""; email : string = ""; password : string = "";

  message : string = ""

  constructor(private serv : ConnectionServiceService ) { }

 data : userFormate[] = [ ]

  ngOnInit(): void {
    var Data = this.serv.getData().subscribe((users)=>{
      if(users){
        
        var gotusers = users.users;
        
        for(let x = 0; x < users.length ; x++){
          let d  = {
            firstName : gotusers[x].firstName,
            lastName : gotusers[x].lastName,
            email : gotusers[x].email,
            password : gotusers[x].password,
            userName : gotusers[x].userName,
          }
  
          this.data.push(d);
        }
        console.log(users.users[0].date)
        
      }
    },
    (err)=>{
      if(err){ console.log(err)}
    })
  }


  submit(){

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(this.first_name == "" || this.last_name == "" || this.email == "" || this.user_name == "" || this.password == ""){
      this.message = " Fill  All the Necessary fields with * symbol. Please fill all the necessary fields !"
    }
    
    else if(!this.email.match(validRegex)){
      this.message = " Please enter a valid Email Id . Ex : companynameXXXXX@gmail.com"
    }
    else{
      var newData ={
        firstName : this.first_name,
        lastName : this.last_name,
        
        email : this.email,
        password : this.password,
        userName : this.user_name,

      }

      this.serv.setData(newData).subscribe((user) =>{
        if(user){
          this.first_name =""; this.last_name = ""; this.user_name = ""; this.email = ""; this.password  = "";
          console.log("successfully sent to server");
          console.log(user);
          
          this.message = " \t" + user.code + "\t" + user.message
          alert(user.message)
        }
      },
      (err) => {
        if(err){
          console.log(err)
          this.first_name =""; this.last_name = ""; this.user_name = ""; this.email = ""; this.password  = "";

        }
      })
    

    }
    
  }

  delete(data : any){
    console.log(data.email)
    
    this.serv.deleteUser(data).subscribe((user)=> {
      if(user){
        console.log(user)
      }
    },
    (err)=>{
      if(err){console.log(err)}
    })

    this.data = []
    this.ngOnInit()
  }

  clear(){
    this.message = ""
    this.first_name = this.last_name = this.user_name = this.password = this.email = ""
  }
 
  changed(){
    this.message = ""
    this.data = []
    console.log("changed")
    this.ngOnInit()
  }

}
