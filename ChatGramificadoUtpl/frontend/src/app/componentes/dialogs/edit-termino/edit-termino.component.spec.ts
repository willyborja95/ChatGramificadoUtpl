import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTerminoComponent } from './edit-termino.component';

describe('EditTerminoComponent', () => {
  let component: EditTerminoComponent;
  let fixture: ComponentFixture<EditTerminoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTerminoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTerminoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
