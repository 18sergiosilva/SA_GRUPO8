import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { Location } from '@angular/common';
import { Utils } from '../utils/utils';
import { map } from 'rxjs/operators';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  const routes: Routes = [
    { path: 'login', component: LoginComponent }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule.withRoutes(routes), FormsModule],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;  
    fixture.detectChanges();
  });

  it('El tipo de Usuario debe estar inicializado en 0' , () => {
    expect(component.tipoUser).toBe(0);
  });

  it('El componente de login debe ser creado correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('El  titulo del componente debe ser "Creacion de Usuario"', () => {
    expect(component.titulo).toBe("Creacion de Usuario");
  });


});
