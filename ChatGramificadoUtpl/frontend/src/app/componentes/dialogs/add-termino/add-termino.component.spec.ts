import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTerminoComponent } from './add-termino.component';

describe('AddTerminoComponent', () => {
  let component: AddTerminoComponent;
  let fixture: ComponentFixture<AddTerminoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTerminoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTerminoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
