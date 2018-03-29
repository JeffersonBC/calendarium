import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { MaterializeModule } from 'angular2-materialize';

import { CacheEventosService } from '../../services/cache-eventos.service';
import { EventosEditarComponent } from './eventos-editar.component';
import { FormService } from '../../services/form.service';
import { EventosService } from '../../services/eventos.service';

import { MockEventosService } from '../../../testing/mock-services/mock.eventos.service';


const MockActivatedRoute = {
  params: {
    id: 1
  },
  snapshot: {
    routeConfig: {
      path: 'editar/1'
    }
  }
};


describe('EventosEditarComponent', () => {
  let component: EventosEditarComponent;
  let fixture: ComponentFixture<EventosEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosEditarComponent ],
      imports: [
        MaterializeModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [
        // CacheEventosService e FormsService só utilizam funções locais simples,
        // por isso o serviço real é usado.
        { provide: ActivatedRoute, useValue: MockActivatedRoute },
        CacheEventosService,
        { provide: EventosService, useValue: MockEventosService },
        FormService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
