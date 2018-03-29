import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { MaterializeModule } from 'angular2-materialize';

import { EventosEditarComponent } from './eventos-editar.component';
import { services } from '../../services';


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
        HttpClientModule,
        MaterializeModule,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [
        ...services,
        // Versão mockada do ActivatedRoute injetado no componente
        { provide: ActivatedRoute, useValue: MockActivatedRoute }
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
