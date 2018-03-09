import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaRegistrarComponent } from './conta-registrar.component';

describe('ContaRegistrarComponent', () => {
  let component: ContaRegistrarComponent;
  let fixture: ComponentFixture<ContaRegistrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContaRegistrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContaRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
