import { CommonModule, Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { Select2Module } from 'ng2-select2';

import { EventosConvidarComponent } from './eventos-convidar.component';

import { CacheEventosService } from '../../services/cache-eventos.service';
import { ConviteService } from '../../services/convite.service';
import { EventosService } from '../../services/eventos.service';
import { FormService } from '../../services/form.service';

import { MockConviteService } from '../../../testing/mock-services/mock.convite.service';
import { MockEventosService } from '../../../testing/mock-services/mock.eventos.service';
import { By } from '@angular/platform-browser';



const MockActivatedRoute = {
  snapshot: {
    params: {
      id: 1
    }
  }
};

const routes: Routes = [
  { path: 'eventos', redirectTo: '' },
];


describe('EventosConvidarComponent', () => {
  let component: EventosConvidarComponent;
  let fixture: ComponentFixture<EventosConvidarComponent>;

  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EventosConvidarComponent
      ],
      imports: [
        CommonModule,
        RouterTestingModule.withRoutes(routes),
        Select2Module
      ],
      providers: [
        { provide: ActivatedRoute, useValue: MockActivatedRoute },
        CacheEventosService,
        { provide: ConviteService, useValue: MockConviteService },
        { provide: EventosService, useValue: MockEventosService },
        FormService,
      ]
    })
    .compileComponents();

    location = TestBed.get(Location);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosConvidarComponent);

    component = fixture.componentInstance;
    component.ngOnInit();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('send button should be disabled if select2 field is empty', () => {
    const sendButton = fixture.debugElement.query(By.css('#button_send'));

    expect(sendButton.nativeElement.disabled).toBeTruthy();
  });

  it('send button should be active if select2 field isn\'t empty', () => {
    // Como é bastante complexo realmente simular seleção do select2,
    // é usada a função que processa mudanças de valor no campo
    component.changed({value: ['teste']});
    fixture.detectChanges();

    const sendButton = fixture.debugElement.query(By.css('#button_send'));
    expect(sendButton.nativeElement.disabled).toBeFalsy();
  });

  it('clicking on the send button should mark month cache as dirty and redirect to /eventos', fakeAsync(() => {
    // Ver teste anterior
    component.changed({value: ['teste']});
    fixture.detectChanges();

    const sendButton = fixture.debugElement.query(By.css('#button_send'));
    sendButton.nativeElement.click();
    tick();

    // Mês e ano de acordo com objeto mockado
    expect(component.cacheEventosService.getMesDirty(2018, 3)).toBeTruthy();
    // '/eventos' redireciona para '/' no roteamento mockado
    expect(location.path()).toBe('/');
  }));
});
