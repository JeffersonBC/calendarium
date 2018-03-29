import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { EventosListaComponent } from './eventos-lista.component';

import { ConviteService } from '../../services/convite.service';
import { CacheEventosService } from '../../services/cache-eventos.service';
import { EventosService } from '../../services/eventos.service';
import { FormService } from '../../services/form.service';

import { MockConviteService } from '../../../testing/mock-services/mock.convite.service';
import { MockEventosService } from '../../../testing/mock-services/mock.eventos.service';


describe('EventosListaComponent', () => {
  let component: EventosListaComponent;
  let fixture: ComponentFixture<EventosListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosListaComponent ],
      imports: [
        CommonModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: EventosService, useValue: MockEventosService },
        CacheEventosService,

        { provide: ConviteService, useValue: MockConviteService },
        FormService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosListaComponent);
    component = fixture.componentInstance;

    // Inicializa variáveis de input
    component.objetos = [];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
