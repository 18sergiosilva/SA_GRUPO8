import { Component, OnInit } from '@angular/core';
import { ServicioCatalogoProductoService } from "../services/servicio-catalogo-producto.service";
import { Router } from '@angular/router';
import { first } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-catalogo-productos',
  templateUrl: './catalogo-productos.component.html',
  styleUrls: ['./catalogo-productos.component.scss']
})
export class CatalogoProductosComponent implements OnInit {

  constructor(private router: Router, private toastr: ToastrService, private http: HttpClient) { }

  productos = [];
  generos = [];
  editoriales = [];
  editorial: string;
  genero: string;
  datos: any;
  listaCarrito = [];
  getProducto = "";
  variable = true;

  ngOnInit() {
    this.getEditoriales();
    this.getGenres();
    this.getProductos();
    this.getProducto = localStorage.getItem('producto');
    if (this.getProducto != null && this.getProducto != "") {
      this.listaCarrito = JSON.parse(this.getProducto);
    }
  }
  getGenres() {
    this.generos = [];
    try {
      this.http.get('http://balanceadorsa-1168785242.us-east-2.elb.amazonaws.com:3000/generos/getAllGenders')
        .toPromise().then((data: any) => {
          this.generos = data.data;
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  }

  getArreglo () {
    return [];
  }

  getEditoriales() {
    this.generos = [];
    try {
      this.http.get('http://balanceadorsa-1168785242.us-east-2.elb.amazonaws.com:3005/users/editoriales')
        .toPromise().then((data: any) => {
          this.editoriales = data.data;
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  }

  getProductos() {
    this.productos = [];
    try {
      this.http.get('http://balanceadorsa-1168785242.us-east-2.elb.amazonaws.com:3002/producto')
        .toPromise().then((data: any) => {
          this.productos = data;
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  }

  buscarPorGenero () {
    this.productos = [];
    try {
      this.http.get('http://balanceadorsa-1168785242.us-east-2.elb.amazonaws.com:3002/producto/genero/' + this.genero)
        .toPromise().then((data: any) => {
          this.productos = data;
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  }

  buscarPorEditorial () {
    this.productos = [];
    try {
      this.http.get('http://balanceadorsa-1168785242.us-east-2.elb.amazonaws.com:3002/producto/editorial/' + this.editorial)
        .toPromise().then((data: any) => {
          this.productos = data;
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  }
  
  agregarAlCarrito(sku) {
    var bandera = 0;
    for (let i = 0; i < this.listaCarrito.length; i++) {
      if (this.listaCarrito[i].sku == sku) {
        this.listaCarrito[i].cantidad += 1;
        localStorage.setItem('producto', JSON.stringify(this.listaCarrito));
        this.toastr.success('¡ALERTA!', "Se agrego "+ this.listaCarrito[i].nombre+" Al carrito de compra");
        bandera = 1;
        break;
      }
    }
    if (bandera != 1) {
      for (let i = 0; i < this.productos.length; i++) {
        if (this.productos[i].sku == sku) {
          const compraProducto =
          {
            createdAt: this.productos[i].createdAt,
            descripcion: this.productos[i].descripcion,
            imagen: this.productos[i].imagen,
            nombre: this.productos[i].nombre,
            precio: this.productos[i].precio,
            cantidad: 1,
            sku: this.productos[i].sku,
            updatedAt: this.productos[i].updatedAt,
            urlImagen: this.productos[i].urlImagen
          }

          this.listaCarrito.push(compraProducto);
          localStorage.setItem('producto', JSON.stringify(this.listaCarrito));
          //console.log(localStorage.getItem('producto'));
          break;
        }
      }
    }

  }


}
