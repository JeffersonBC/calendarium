import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { ContaLoginComponent } from './conta-login.component';

import { FormService } from '../../services/form.service';
import { LoginEmitService } from '../../services/login-emit.service';
import { ContasService } from '../../services/contas.service';

import { MockContasService } from '../../../testing/mock-services/mock.contas.service';

describe('ContaLoginComponent', () => {
  let component: ContaLoginComponent;
  let fixture: ComponentFixture<ContaLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContaLoginComponent ],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [
        FormService,
        LoginEmitService,
        { provide: ContasService, useValue: MockContasService },
      ],
    })
    .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(ContaLoginComponent);

    component = fixture.componentInstance;
    component.ngOnInit();

    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('empty form should be invalid', () => {
    expect(component.formulario.invalid).toBeTruthy();
  });


  it('filled form should be valid', () => {
    component.formulario.controls['username'].setValue('Teste');
    component.formulario.controls['password'].setValue('a12345678');

    expect(component.formulario.valid).toBeTruthy();
  });


  it('submitting a valid username and password saves an auth token to the local storage and emmits a login event',
    fakeAsync(() => {
      localStorage.removeItem('auth_token');

      component.formulario.controls['username'].setValue('Teste');
      component.formulario.controls['password'].setValue('a12345678');

      let loginStatus = false;
      component.loginEmitService.changeEmitted$.subscribe(status => loginStatus = status);

      component.tryLogin();
      tick();
      fixture.detectChanges();

      expect(localStorage.getItem('auth_token')).toBeTruthy();
      expect(loginStatus).toBeTruthy();
      expect(component.errorMessage).toBeFalsy();
    }
  ));


  it('submitting an invalid username and password doesn\'t save an auth token, doesn\'t emmit a login event' +
    'and shows an error message',
    fakeAsync(() => {
      localStorage.removeItem('auth_token');

      component.formulario.controls['username'].setValue('Invalido');
      component.formulario.controls['password'].setValue('Invalido');

      let loginStatus = false;
      component.loginEmitService.changeEmitted$.subscribe(status => loginStatus = status);

      component.tryLogin();
      tick();
      fixture.detectChanges();

      expect(localStorage.getItem('auth_token')).toBeFalsy();
      expect(loginStatus).toBeFalsy();
      expect(component.errorMessage).toBeTruthy();

      const messageEl = fixture.debugElement.query(By.css('.error-message'));
      expect(messageEl).toBeTruthy();
    }
  ));
});
