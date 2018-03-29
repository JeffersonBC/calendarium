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
        { provide: EventosService, useValue: MockEventosService },
        CacheEventosService,

        { provide: ConviteService, useValue: MockConviteService },
        FormService,
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
