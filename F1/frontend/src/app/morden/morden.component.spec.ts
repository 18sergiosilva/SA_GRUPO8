import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MordenComponent } from './morden.component';

describe('MordenComponent', () => {
  let component: MordenComponent;
  let fixture: ComponentFixture<MordenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MordenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MordenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
