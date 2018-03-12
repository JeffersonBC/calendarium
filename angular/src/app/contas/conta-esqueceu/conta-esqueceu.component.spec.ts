import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaEsqueceuComponent } from './conta-esqueceu.component';

describe('ContaEsqueceuComponent', () => {
  let component: ContaEsqueceuComponent;
  let fixture: ComponentFixture<ContaEsqueceuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContaEsqueceuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContaEsqueceuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
