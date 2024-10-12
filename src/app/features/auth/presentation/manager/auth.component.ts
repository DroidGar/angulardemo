import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {Login} from '../../domain/usecases/login';
import {Failure} from '../../../../core/failure/failure';
import {CredentialsModel} from '../../data/models/credentials-model';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    MatError,
    NgIf,
  ],
  templateUrl: '../pages/auth.component.html',
  styleUrl: '../pages/auth.component.css'
})
export class AuthComponent implements OnInit {
  authForm!: FormGroup;
  invalidAuthCredentials = false;

  constructor(private formBuilder: FormBuilder, private login: Login, private router: Router) {
  }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      email: ['user@demo.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit(): Promise<void> {
    this.invalidAuthCredentials = false;
    let credentials = CredentialsModel.fromFormGroup(this.authForm);
    let result = await this.login.execute(credentials);
    if (result instanceof Failure) {
      this.invalidAuthCredentials = true;
      return;
    }
    this.router.navigate(['/products']).then();
  }
}
