import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisordenesComponent } from './misordenes.component';

describe('MisordenesComponent', () => {
  let component: MisordenesComponent;
  let fixture: ComponentFixture<MisordenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisordenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisordenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
