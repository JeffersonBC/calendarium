import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosAdicionarComponent } from './eventos-adicionar.component';

describe('EventosAdicionarComponent', () => {
  let component: EventosAdicionarComponent;
  let fixture: ComponentFixture<EventosAdicionarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosAdicionarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosAdicionarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
