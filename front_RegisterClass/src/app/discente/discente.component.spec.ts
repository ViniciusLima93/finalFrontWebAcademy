import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscenteComponent } from './discente.component';

describe('DiscenteComponent', () => {
  let component: DiscenteComponent;
  let fixture: ComponentFixture<DiscenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
