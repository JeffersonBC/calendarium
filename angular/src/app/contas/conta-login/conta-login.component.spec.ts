import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
