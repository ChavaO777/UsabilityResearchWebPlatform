import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthService } from '../services/auth.service'; 
import { ErrorHandlerService } from '../services/error-handler.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    id: string;
    password: string;

    constructor(private errorHandler: ErrorHandlerService, private auth: AuthService, public router: Router) { }

    ngOnInit() {

        if (this.auth.isLoggedIn()) {
            this.router.navigate(['dashboard']);
        }

        this.id = '';
        this.password = '';
    }

    login() {

        if (this.validate()) {

            this.auth.login(this.id, this.password)
                .subscribe(
                    res => {
                        this.auth.setSession(res);
                        console.log("Successful login!");
                        this.router.navigate(['/dashboard']);
                        localStorage.setItem('isLoggedin', 'true');
                    },
                    err => {
                        this.errorHandler.handleError(err);
                        this.password = '';
                        this.router.navigate(['/login']);
                    }
                );
        }

        return false;
    }

    validate(){

        console.log("id = " + this.id + "; password = " + this.password);

        if(!this.id || !this.password){

            this.errorHandler.showErrorMessage('You must introduce your email address and password.');
            return false;
        }
        else{
            return true;
        }
    }

    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
    }
}
