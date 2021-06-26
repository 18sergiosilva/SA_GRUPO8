import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-libro',
  templateUrl: './editar-libro.component.html',
  styleUrls: ['./editar-libro.component.scss']
})
export class EditarLibroComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) { }
  id = String(this.route.snapshot.params['id']);

  nuevo_sku: number;
  nuevo_precio: number;
  nuevo_stock: number;
  nuevo_descripcion: string;
  url = '../assets/default.png';
  nuevo_nombre: string;
  nuevo_genero: string;
  editorial = localStorage.getItem('nombre');


  ngOnInit() {
    if(localStorage.getItem('logged') === '0'){
      this.router.navigate(['login']);
    }
    this.getInfoLibro();
  }
  getInfoLibro() {
    this.http.get('http://balanceadorsa-1168785242.us-east-2.elb.amazonaws.com:3002/producto/' + this.id)
      .toPromise().then((data: any) => {
        this.nuevo_sku = data.sku;
        this.nuevo_precio = data.precio;
        this.nuevo_stock = data.Stock;
        this.nuevo_descripcion = data.descripcion;
        this.nuevo_nombre = data.nombre;
        this.nuevo_genero = data.Genero.join(", ");
      });
  }
  editar() {
    const headers = new HttpHeaders();
    this.http.put('http://balanceadorsa-1168785242.us-east-2.elb.amazonaws.com:3003/producto/' + this.id,
      {
        "sku": this.nuevo_sku,
        "nombre": this.nuevo_nombre,
        "precio": this.nuevo_precio,
        "descripcion": this.nuevo_descripcion,
        "Editorial": this.editorial,
        "Genero": [this.nuevo_genero],
        "Stock": this.nuevo_stock
      }).toPromise().then((data: any) => {
        console.log(data);
        this.router.navigate(['libros']);
      });
    }
}
