import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { EventosComponent } from './eventos.component';
import { EventosListaComponent } from './eventos-lista/eventos-lista.component';

import { CacheEventosService } from '../services/cache-eventos.service';
import { ConviteService } from '../services/convite.service';
import { FormService } from '../services/form.service';
import { EventosService } from '../services/eventos.service';

import { MockConviteService } from '../../testing/mock-services/mock.convite.service';
import { MockEventosService } from '../../testing/mock-services/mock.eventos.service';
import { By } from '@angular/platform-browser';

describe('EventosComponent', () => {
  let component: EventosComponent;
  let fixture: ComponentFixture<EventosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EventosComponent,
        EventosListaComponent,
      ],
      imports: [
        CommonModule,
        RouterTestingModule,
      ],
      providers: [
        CacheEventosService,
        { provide: ConviteService, useValue: MockConviteService },
        { provide: EventosService, useValue: MockEventosService },
        FormService,
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosComponent);

    component = fixture.componentInstance;
    component.hoje_mes = 3;
    component.hoje_ano = 2018;
    component.ngOnInit();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('active and not active month/ year buttons should have the right classes', () => {
    const mes3El = fixture.debugElement.query(By.css('#button_mes_3'));
    const mes4El = fixture.debugElement.query(By.css('#button_mes_4'));

    const ano2018El = fixture.debugElement.query(By.css('#button_ano_2018'));
    const ano2019El = fixture.debugElement.query(By.css('#button_ano_2019'));

    expect(mes3El.nativeElement.classList.contains('black-text')).toBeTruthy();
    expect(mes4El.nativeElement.classList.contains('green-text')).toBeTruthy();

    expect(ano2018El.nativeElement.classList.contains('active')).toBeTruthy();
    expect(ano2019El.nativeElement.classList.contains('waves-effect')).toBeTruthy();
  });

  it('clicking on month/ year buttons should change month/ year', () => {
    const mes4El = fixture.debugElement.query(By.css('#button_mes_4'));
    const ano2019El = fixture.debugElement.query(By.css('#button_ano_2019'));

    // Data padrão do ambiente mockado é Março/2018
    mes4El.nativeElement.click();
    ano2019El.nativeElement.click();

    expect(component.hoje_mes).toBe(4);
    expect(component.hoje_ano).toBe(2019);
  });

  it('\'add event\' button exists and has the proper routelink', () => {
    const addEventButtonEl = fixture.debugElement.query(By.css('#button_add_event'));

    expect(addEventButtonEl).toBeTruthy();
    expect(addEventButtonEl.nativeElement.getAttribute('href')).toEqual('/adicionar');
  });
});
