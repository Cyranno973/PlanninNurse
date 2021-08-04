import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  errorMessage: string;
  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initSigninForm();
  }

  initSigninForm() {
    this.signinForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
      }
    )
  }

  onSubmitSigninForm() {
    console.log(this.signinForm.value);
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;
  }
}
