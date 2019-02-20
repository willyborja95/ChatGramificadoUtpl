import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGrupalComponent } from './add-grupal.component';

describe('AddGrupalComponent', () => {
  let component: AddGrupalComponent;
  let fixture: ComponentFixture<AddGrupalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGrupalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGrupalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
