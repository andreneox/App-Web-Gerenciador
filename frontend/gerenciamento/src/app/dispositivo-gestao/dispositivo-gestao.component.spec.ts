import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispositivoGestaoComponent } from './dispositivo-gestao.component';

describe('DispositivoGestaoComponent', () => {
  let component: DispositivoGestaoComponent;
  let fixture: ComponentFixture<DispositivoGestaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DispositivoGestaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DispositivoGestaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
