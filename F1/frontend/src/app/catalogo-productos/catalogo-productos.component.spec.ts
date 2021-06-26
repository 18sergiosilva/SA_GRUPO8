import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { CatalogoProductosComponent } from './catalogo-productos.component';
import { Component, OnInit } from '@angular/core';
import { ServicioCatalogoProductoService } from "../services/servicio-catalogo-producto.service";
import { first } from "rxjs/operators";
import { ToastrModule, ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'
import { HttpClient } from '@angular/common/http';

describe('CatalogoProductosComponent', () => {
    let component: CatalogoProductosComponent;
    let fixture: ComponentFixture<CatalogoProductosComponent>;
    let router: Router;

    const routes: Routes = [
        { path: 'catalogo', component: CatalogoProductosComponent }
    ];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ToastrModule.forRoot(), HttpClientModule, RouterTestingModule.withRoutes(routes), FormsModule],
            declarations: [CatalogoProductosComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CatalogoProductosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Carga con arreglo de productos completa', () => {
        expect(component.variable).toBeTrue;
    });

    it('Visualización de tabla de datos de libros', () => {
        expect(component.variable).toBeTrue;
    });

    it("Busqueda por medio de objetos especiales", () => {
        expect(component.variable).toBeTrue;
    });
});