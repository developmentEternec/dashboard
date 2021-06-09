import { Component, OnInit } from '@angular/core';


//Imports necesarios
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formularioLogin : FormGroup = this.fb.group({
    correo: ['eduardo.alvarado@eternec.com', [Validators.required, Validators.minLength(6)]],
    password: ['admin1234', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) { }


    login(){
      // console.log(this.formularioLogin.value);
     //  console.log(this.formularioLogin.valid);
     const { correo, password } = this.formularioLogin.value
     
     this.authService.login(correo, password)
     .subscribe( ok =>{
        
       if(ok === true){
         this.router.navigateByUrl('/dashboard');
       }else {
         Swal.fire('Error', ok, 'error');
       }
      
     });
   }

  ngOnInit(): void {
  }

}
