import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaGrupalComponent } from './sala-grupal.component';

describe('SalaGrupalComponent', () => {
  let component: SalaGrupalComponent;
  let fixture: ComponentFixture<SalaGrupalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaGrupalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaGrupalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
