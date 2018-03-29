import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { EventosConvitesComponent } from './eventos-convites.component';
import { EventosListaComponent } from '../eventos-lista/eventos-lista.component';

import { CacheEventosService } from '../../services/cache-eventos.service';
import { ConviteService } from '../../services/convite.service';
import { EventosService } from '../../services/eventos.service';
import { FormService } from '../../services/form.service';

import { MockConviteService } from '../../../testing/mock-services/mock.convite.service';
import { MockEventosService } from '../../../testing/mock-services/mock.eventos.service';


const MockActivatedRoute = {
  params: {
    id: 1
  },
};


describe('EventosConvitesComponent', () => {
  let component: EventosConvitesComponent;
  let fixture: ComponentFixture<EventosConvitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EventosConvitesComponent,
        EventosListaComponent
      ],
      imports: [
        CommonModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: EventosService, useValue: MockEventosService },
        CacheEventosService,

        { provide: ActivatedRoute, useValue: MockActivatedRoute },
        { provide: ConviteService, useValue: MockConviteService },
        FormService,
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosConvitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
