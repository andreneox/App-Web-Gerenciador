import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciamentoCategoriaComponent } from './gerenciamento-categoria.component';

describe('GerenciamentoCategoriaComponent', () => {
  let component: GerenciamentoCategoriaComponent;
  let fixture: ComponentFixture<GerenciamentoCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerenciamentoCategoriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciamentoCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
