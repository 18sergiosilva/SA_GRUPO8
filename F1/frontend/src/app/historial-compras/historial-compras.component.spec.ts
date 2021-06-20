import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { Location } from '@angular/common';
import { Utils } from '../utils/utils';
import { map } from 'rxjs/operators';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HistorialComprasComponent } from './historial-compras.component';

describe('HistorialComprasComponent', () => {
  let component: HistorialComprasComponent;
  let fixture: ComponentFixture<HistorialComprasComponent>;
  let router: Router;

  const routes: Routes = [
    { path: 'historial', component: HistorialComprasComponent }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule.withRoutes(routes), FormsModule],
      declarations: [ HistorialComprasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('El componente de historial debe ser creado correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('El  titulo del componente debe ser "Historial de compras"', () => {
    expect(component.titulo).toBe("Historial de compras");
  });

   it("Debe retornar impreso al llamar al metodo imprimirError", () => {
    expect(component.imprimirError("miError")).toContain("impreso");
  });

});
