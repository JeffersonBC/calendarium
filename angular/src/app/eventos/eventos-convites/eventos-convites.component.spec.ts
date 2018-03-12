import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosConvitesComponent } from './eventos-convites.component';

describe('EventosConvitesComponent', () => {
  let component: EventosConvitesComponent;
  let fixture: ComponentFixture<EventosConvitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosConvitesComponent ]
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
