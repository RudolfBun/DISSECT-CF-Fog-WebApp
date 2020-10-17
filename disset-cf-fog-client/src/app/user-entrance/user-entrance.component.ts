import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenStorageService } from '../services/token-storage/token-storage.service';

export interface CoverData {
  title: string;
  buttonLabel: string;
}

@Component({
  selector: 'app-user-entrance',
  templateUrl: './user-entrance.component.html',
  styleUrls: ['./user-entrance.component.css']
})
export class UserEntranceComponent implements OnInit {
  public entranceForm: FormGroup;
  public isRegisterSuccessful = false;
  public isRegisterFailed = false;
  public isLoginSucessful = false;
  public isLoginFailed = false;
  public data: CoverData;
  public isLogin = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit() {
    this.isLogin = this.activatedRoute.snapshot.routeConfig.path.includes('login');
    this.data = this.isLogin
      ? { title: 'Login', buttonLabel: 'Login' }
      : { title: 'Registration', buttonLabel: 'Register' };
    this.initForm();
  }

  private initForm() {
    this.entranceForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  public onSubmit(): void {
    if (this.isLogin) {
      this.authService.login(this.entranceForm.value).subscribe(
        data => {
          this.tokenStorageService.saveToken(data.accessToken);
          this.tokenStorageService.saveUser(data);

          this.isLoginFailed = false;
          this.isLoginSucessful = true;
        },
        err => {
          this.isLoginFailed = true;
        }
      );
    } else {
      this.authService.register(this.entranceForm.value).subscribe(
        data => {
          console.log(data);
          this.isRegisterSuccessful = true;
          this.isRegisterFailed = false;
        },
        err => {
          this.isRegisterFailed = true;
        }
      );
    }
  }
}