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
import { postLoginObject } from '../../testing/mock-objects/mock.contas.objects';
import { By } from '@angular/platform-browser';


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
    localStorage.clear();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show appropriate message when not logged in', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const notLoggedMessageEl = fixture.debugElement.query(By.css('#logged_off_message'));
    expect(notLoggedMessageEl).toBeTruthy();
  });

  it('should show future event list when logged in', () => {
    localStorage.setItem('auth_token', postLoginObject['token']);
    component.ngOnInit();
    fixture.detectChanges();

    const nextEventsEl = fixture.debugElement.query(By.css('#next_events_collection'));
    expect(nextEventsEl).toBeTruthy();
  });

  it('should show appropriate message when logged in but no future event', () => {
    component.loggedIn = true;
    component.eventos = [];
    fixture.detectChanges();

    const noNextEventsMessageEl = fixture.debugElement.query(By.css('#no_next_event'));
    expect(noNextEventsMessageEl).toBeTruthy();
  });
});
