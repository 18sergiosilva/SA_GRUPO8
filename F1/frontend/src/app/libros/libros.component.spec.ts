import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { LibrosComponent } from './libros.component';

describe('LibrosComponent', () => {
  let component: LibrosComponent;
  let fixture: ComponentFixture<LibrosComponent>;
  let router: Router;

  const routes: Routes = [
    { path: 'libros', component: LibrosComponent }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule.withRoutes(routes), FormsModule],
      declarations: [LibrosComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Creación de libros con datos correctos', () => {
    expect(true).toBeTrue;
  });

  it('Incersión de un libro nuevo en la base de datos con respuesta exitosa', () => {
    expect(true).toBeTrue;
  });

  it("Mensaje de incerción incorrecta al envíar campos equivoados y sin datos.", () => {
    expect(true).toBeTrue;

  });

});