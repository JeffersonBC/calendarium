import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { EventosListaComponent } from './eventos-lista.component';

import { ConviteService } from '../../services/convite.service';
import { CacheEventosService } from '../../services/cache-eventos.service';
import { EventosService } from '../../services/eventos.service';
import { FormService } from '../../services/form.service';

import { MockConviteService } from '../../../testing/mock-services/mock.convite.service';
import { MockEventosService } from '../../../testing/mock-services/mock.eventos.service';

import { getEventosAnoObject } from '../../../testing/mock-objects/mock.eventos.objects';
import { getConviteListarObject } from '../../../testing/mock-objects/mock.convite.objects';


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
        CacheEventosService,
        { provide: ConviteService, useValue: MockConviteService },
        { provide: EventosService, useValue: MockEventosService },
        FormService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosListaComponent);
    component = fixture.componentInstance;

    // Inicializa variáveis de @Input
    component.objetos = [];
    component.mensagemArrayVazio = 'Array vazio';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show appropriate message when there\'s no event/ invitation', () => {
    const messageContainer = fixture.debugElement.query(By.css('#message_container'));

    expect(messageContainer).toBeTruthy();
    expect(messageContainer.nativeElement.textContent).toContain(component.mensagemArrayVazio);
  });

  it('created and invited events should have the appropriate card actions', () => {
    component.objetos = getEventosAnoObject['msg']['3'];
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('#a_edit_0'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#a_send_0'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#button_cancel_0'))).toBeFalsy();

    expect(fixture.debugElement.query(By.css('#a_edit_1'))).toBeFalsy();
    expect(fixture.debugElement.query(By.css('#a_send_1'))).toBeFalsy();
    expect(fixture.debugElement.query(By.css('#button_cancel_1'))).toBeTruthy();
  });

  it('invitations should have the appropriate card actions', () => {
    component.objetos = getConviteListarObject['msg'];
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('#button_accept_0'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#button_accept_0'))).toBeTruthy();
  });

  it('cards for created and invited events should have the appropriate classes', () => {
    component.objetos = getEventosAnoObject['msg']['3'];
    fixture.detectChanges();

    const card0El = fixture.debugElement.query(By.css('#object_card_0'));
    const card1El = fixture.debugElement.query(By.css('#object_card_1'));

    expect(card0El.nativeElement.classList.contains('yellow')).toBeFalsy();
    expect(card1El.nativeElement.classList.contains('yellow')).toBeTruthy();
  });

  it('should render date/time properly, depending on when the events starts and ends', () => {
    component.objetos = getEventosAnoObject['msg']['3'];
    fixture.detectChanges();

    const start_datetime_0 = fixture.debugElement.query(By.css('#span_start_datetime_0'));
    const start_datetime_1 = fixture.debugElement.query(By.css('#span_start_datetime_1'));
    const start_datetime_2 = fixture.debugElement.query(By.css('#span_start_datetime_2'));

    // Começa/termina em dias diferentes do mesmo mês
    expect(start_datetime_0.nativeElement.textContent).toBe('Dia 05 às 12:00');
    // Começa/termina no mesmo dia
    expect(start_datetime_1.nativeElement.textContent).toBe('Dia 16');
    // Começa/termina em meses diferentes. Em inglês para não configurar localidade durante teste.
    expect(start_datetime_2.nativeElement.textContent).toBe('29 de March às 12:00');
  });
});
