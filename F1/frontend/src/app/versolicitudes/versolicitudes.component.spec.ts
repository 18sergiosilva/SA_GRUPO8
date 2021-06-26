import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersolicitudesComponent } from './versolicitudes.component';

describe('VersolicitudesComponent', () => {
  let component: VersolicitudesComponent;
  let fixture: ComponentFixture<VersolicitudesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersolicitudesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
