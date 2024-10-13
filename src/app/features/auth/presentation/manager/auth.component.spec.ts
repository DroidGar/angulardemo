import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthComponent } from './auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Login } from '../../domain/usecases/login';
import {UnhandledFailure} from '../../../../core/failure/unhandled-failure';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let loginSpy: jasmine.SpyObj<Login>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const loginSpyObj = jasmine.createSpyObj('Login', ['execute']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: Login, useValue: loginSpyObj },
        { provide: Router, useValue: routerSpyObj }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    loginSpy = TestBed.inject(Login) as jasmine.SpyObj<Login>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.authForm.value).toEqual({
      email: '',
      password: ''
    });
  });

  it('should navigate to products on successful login', async () => {
    loginSpy.execute.and.returnValue(Promise.resolve('token'));
    await component.onSubmit();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('should set invalidAuthCredentials to true on login failure', async () => {
    loginSpy.execute.and.returnValue(Promise.resolve(new UnhandledFailure('Login failed')));
    await component.onSubmit();
    expect(component.invalidAuthCredentials).toBeTrue();
  });

  it('should not navigate on login failure', async () => {
    loginSpy.execute.and.returnValue(Promise.resolve(new UnhandledFailure('Login failed')));
    await component.onSubmit();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

});
