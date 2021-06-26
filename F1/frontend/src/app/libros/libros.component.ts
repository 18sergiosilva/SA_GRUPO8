import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.scss']
})
export class LibrosComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }
  productos = [];
  generos = [];
  productos_temp = [];
  url = '../assets/default.png';
  cardImageBase64: string;
  nuevo_sku: number;
  nuevo_precio: number;
  nuevo_stock: number;
  nuevo_descripcion: string;
  nuevo_nombre: string;
  nuevo_genero: string;
  editorial: string;




  ngOnInit() {
    this.getData();
    this.getGeneros();
  }

  getGeneros() {
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

  getData() {
    this.productos = [];
    this.editorial = localStorage.getItem('nombre');
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

  agregar() {
    const headers = new HttpHeaders();
    headers.set('usuario', localStorage.getItem('username'))
    this.http.post('http://balanceadorsa-1168785242.us-east-2.elb.amazonaws.com:3000/productos',
      {
        "sku": this.nuevo_sku,
        "nombre": this.nuevo_nombre,
        "precio": this.nuevo_precio,
        "descripcion": this.nuevo_descripcion,
        "imagen": "",
        "urlImagen": "",
        "Editorial": this.editorial,
        "Genero": [this.nuevo_genero],
        "Stock": this.nuevo_stock
      }, { 'headers': headers }).toPromise().then((data: any) => {
        console.log(data);
        this.cancelar();
        this.getData();
      });
  }

  eliminar(id: string) {
    const direccion = 'http://balanceadorsa-1168785242.us-east-2.elb.amazonaws.com:3001/producto/' + id; // cambiar 
    this.http.delete(direccion)
    .toPromise().then((data: any) => {
      console.log(data);
      this.getData();
    });
  }

  cancelar() {
    this.nuevo_descripcion = '';
    this.nuevo_nombre = '';
    this.nuevo_precio = null;
    this.url = '../assets/default.png';
  }

  editar(id: string) {
    this.router.navigate(['editarlibro', id]);
  }

  onFileSelected(event: { target: { files: Blob[]; }; }) {
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      // tslint:disable-next-line: no-shadowed-variable
      reader.onload = (event: any) => {
        const image = new Image();
        image.src = event.target.result;
        image.onload = rs => {
          const imgBase64Path = event.target.result;
          this.cardImageBase64 = imgBase64Path;
          this.url = event.target.result;
        };
      };
    }
  }


}
