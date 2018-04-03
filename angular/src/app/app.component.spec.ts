import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { MaterializeModule } from 'angular2-materialize';

import { AppComponent } from './app.component';

import { CacheEventosService } from './services/cache-eventos.service';
import { ConviteService } from './services/convite.service';
import { EventosService } from './services/eventos.service';
import { FormService } from './services/form.service';
import { LoginEmitService } from './services/login-emit.service';

import { MockConviteService } from '../testing/mock-services/mock.convite.service';
import { MockEventosService } from '../testing/mock-services/mock.eventos.service';

import { postLoginObject } from '../testing/mock-objects/mock.contas.objects';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      imports: [
        MaterializeModule,
        BrowserModule,
        RouterTestingModule,
      ],
      providers: [
        CacheEventosService,
        { provide: ConviteService, useValue: MockConviteService },
        { provide: EventosService, useValue: MockEventosService },
        FormService,
        LoginEmitService,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);

    component = fixture.componentInstance;
    localStorage.clear();

    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should show/ hide menu options when logged in', () => {
    localStorage.setItem('auth_token', postLoginObject['token']);
    component.ngOnInit();
    fixture.detectChanges();

    const sideMenuHome = fixture.debugElement.query(By.css('#sidemenu_home'));
    const sideMenuCalendar = fixture.debugElement.query(By.css('#sidemenu_calendar'));
    const sideMenuInvitations = fixture.debugElement.query(By.css('#sidemenu_invitations'));
    const sideMenuLogout = fixture.debugElement.query(By.css('#sidemenu_logout'));

    const navbarLogin = fixture.debugElement.query(By.css('#navbar_login'));
    const sideMenuLogin = fixture.debugElement.query(By.css('#sidemenu_login'));

    expect(sideMenuHome).toBeTruthy();

    expect(sideMenuCalendar).toBeTruthy();
    expect(sideMenuInvitations).toBeTruthy();
    expect(sideMenuLogout).toBeTruthy();

    expect(navbarLogin).toBeNull();
    expect(sideMenuLogin).toBeNull();
  });

  it('should show/ hide menu options when NOT logged in', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const sideMenuHome = fixture.debugElement.query(By.css('#sidemenu_home'));
    const sideMenuCalendar = fixture.debugElement.query(By.css('#sidemenu_calendar'));
    const sideMenuInvitations = fixture.debugElement.query(By.css('#sidemenu_invitations'));
    const sideMenuLogout = fixture.debugElement.query(By.css('#sidemenu_logout'));

    const navbarLogin = fixture.debugElement.query(By.css('#navbar_login'));
    const sideMenuLogin = fixture.debugElement.query(By.css('#sidemenu_login'));

    expect(sideMenuHome).toBeTruthy();

    expect(sideMenuCalendar).toBeNull();
    expect(sideMenuInvitations).toBeNull();
    expect(sideMenuLogout).toBeNull();

    expect(navbarLogin).toBeTruthy();
    expect(sideMenuLogin).toBeTruthy();
  });

  it('links should have the right route address', () => {
    // Without loging in
    component.ngOnInit();
    fixture.detectChanges();

    const sideMenuHome = fixture.debugElement.query(By.css('#sidemenu_home'));
    const navbarLogin = fixture.debugElement.query(By.css('#navbar_login'));
    const sideMenuLogin = fixture.debugElement.query(By.css('#sidemenu_login'));

    expect(sideMenuHome.nativeElement.getAttribute('href')).toEqual('/');
    expect(navbarLogin.nativeElement.getAttribute('href')).toEqual('/conta/login');
    expect(sideMenuLogin.nativeElement.getAttribute('href')).toEqual('/conta/login');

    // Loging in
    localStorage.setItem('auth_token', postLoginObject['token']);
    component.ngOnInit();
    fixture.detectChanges();

    const sideMenuCalendar = fixture.debugElement.query(By.css('#sidemenu_calendar'));
    const sideMenuInvitations = fixture.debugElement.query(By.css('#sidemenu_invitations'));

    expect(sideMenuCalendar.nativeElement.getAttribute('href')).toEqual('/eventos');
    expect(sideMenuInvitations.nativeElement.getAttribute('href')).toEqual('/eventos/convites');
  });

});
