import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosEditarComponent } from './eventos-editar.component';

describe('EventosEditarComponent', () => {
  let component: EventosEditarComponent;
  let fixture: ComponentFixture<EventosEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosEditarComponent ]
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
