import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeComponent } from './home.component';

import { ContasService } from '../services/contas.service';
import { EventosService } from '../services/eventos.service';
import { FormService } from '../services/form.service';
import { LoginEmitService } from '../services/login-emit.service';

import { MockContasService } from '../../testing/mock-services/mock.contas.service';
import { MockEventosService } from '../../testing/mock-services/mock.eventos.service';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        CommonModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: ContasService, useValue: MockContasService },
        { provide: EventosService, useValue: MockEventosService },
        FormService,
        LoginEmitService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
