import { Location } from '@angular/common';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Routes, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { MaterializeModule } from 'angular2-materialize';

import { CacheEventosService } from '../../services/cache-eventos.service';
import { EventosEditarComponent } from './eventos-editar.component';
import { FormService } from '../../services/form.service';
import { EventosService } from '../../services/eventos.service';

import { MockEventosService } from '../../../testing/mock-services/mock.eventos.service';


// Variáveis para mockar o ambiente de execução
const MockActivatedRoute = {
  snapshot: {
    routeConfig: { path: 'editar/:id' },
    params: { id: 1 }
  }
};

const routes: Routes = [
  { path: 'eventos', redirectTo: '' },
  { path: 'eventos/editar/:id', component: EventosEditarComponent }
];


describe('EventosEditarComponent', () => {
  let component: EventosEditarComponent;
  let fixture: ComponentFixture<EventosEditarComponent>;

  let location: Location;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosEditarComponent ],
      imports: [
        MaterializeModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(routes),
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

    router = TestBed.get(Router);
    location = TestBed.get(Location);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosEditarComponent);

    component = fixture.componentInstance;
    component.ngOnInit();

    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should show appropriate title when editing', () => {
    const titleEl = fixture.debugElement.query(By.css('h3'));
    expect(titleEl.nativeElement.textContent).toEqual('Editar Evento');
  });


  it('form should be valid after loading editing', () => {
    expect(component.formulario.valid).toBeTruthy();
  });


  it('empty form should be invalid', () => {
    component.formulario.patchValue({
      name: '',
      description: '',
      start_date: '',
      start_time: '',
      end_date: '',
      end_time: ''
    });

    expect(component.formulario.invalid).toBeTruthy();
  });

  it('onSubmit should mark invalid fields as invalid',
    fakeAsync(() => {
      component.formulario.patchValue({
        name: '',
        start_date: '',
        end_time: ''
      });

      component.onSubmit();
      tick();
      fixture.detectChanges();

      const eventNameEl = fixture.debugElement.query(By.css('#event_name'));
      const eventStartDateEl = fixture.debugElement.query(By.css('#event_startd'));
      const eventEndTimeNameEl = fixture.debugElement.query(By.css('#event_endt'));

      expect(eventNameEl.nativeElement.classList.contains('invalid')).toBeTruthy();
      expect(eventStartDateEl.nativeElement.classList.contains('invalid')).toBeTruthy();
      expect(eventEndTimeNameEl.nativeElement.classList.contains('invalid')).toBeTruthy();
    }
  ));

  it('onSubmit, after a successful post, should navigate to \'/eventos\' and set month as dirty',
    fakeAsync(() => {
      component.onSubmit();
      tick();

      // Mês e ano de acordo com objeto mockado
      expect(component.cacheEventosService.getMesDirty(2018, 3)).toBeTruthy();

      // '/eventos' redireciona para '/' no roteamento mockado
      expect(location.path()).toBe('/');
    }
  ));

  it('delete should mark month as dirty and navigate to event list',
    fakeAsync(() => {
      spyOn(window, 'confirm').and.callFake(function () {
        return true;
      });

      component.delete();
      tick();

      // Mês e ano de acordo com objeto mockado
      expect(component.cacheEventosService.getMesDirty(2018, 3)).toBeTruthy();

      // '/eventos' redireciona para '/' no roteamento mockado
      expect(location.path()).toBe('/');
    }
  ));

});
