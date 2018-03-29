import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { Select2Module } from 'ng2-select2';

import { EventosConvidarComponent } from './eventos-convidar.component';

import { CacheEventosService } from '../../services/cache-eventos.service';
import { ConviteService } from '../../services/convite.service';
import { EventosService } from '../../services/eventos.service';
import { FormService } from '../../services/form.service';

import { MockConviteService } from '../../../testing/mock-services/mock.convite.service';
import { MockEventosService } from '../../../testing/mock-services/mock.eventos.service';


const MockActivatedRoute = {
  snapshot: {
    params: {
      id: 1
    }
  }
};


describe('EventosConvidarComponent', () => {
  let component: EventosConvidarComponent;
  let fixture: ComponentFixture<EventosConvidarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosConvidarComponent ],
      imports: [
        CommonModule,
        RouterTestingModule,
        Select2Module
      ],
      providers: [
        // CacheEventosService e FormService não usam nada assíncro e/ou dependente do backend,
        // então o serviço real é usado
        { provide: EventosService, useValue: MockEventosService },
        CacheEventosService,

        { provide: ActivatedRoute, useValue: MockActivatedRoute },
        { provide: ConviteService, useValue: MockConviteService },
        FormService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosConvidarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
