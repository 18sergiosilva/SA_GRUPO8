import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { Location } from '@angular/common';
import { Utils } from '../utils/utils';
import { map } from 'rxjs/operators';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { GestionarUsuarioComponent } from './gestionar-usuario.component';
import Swal from 'sweetalert2';

describe('LoginComponent', () => {
  let component: GestionarUsuarioComponent;
  let fixture: ComponentFixture<GestionarUsuarioComponent>;
  let router: Router;

  const routes: Routes = [
    { path: 'login', component: GestionarUsuarioComponent }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule.withRoutes(routes), FormsModule],
      declarations: [ GestionarUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarUsuarioComponent);
    component = fixture.componentInstance;  
    fixture.detectChanges();
  });
  
  //Test de Integración 1 
  it('Debe retornar True al eliminar un usuario', async(() => {
    try {
    expect(component.cambiarStatus("editorialfrans")).toBeTrue();
    } catch (error) { 
      console.log("Error al momento de eliminar usuario");
    }
  }));

  //Test de Integración 2
  it('Debe retornar True al cargar los Usuarios', async(() => {
    try {
    expect(component.cargarUsers()).toBeGreaterThanOrEqual(0);
  } catch (error) { 
    console.log("Error al momento de cargar usuarios");
  }
  }));

});
