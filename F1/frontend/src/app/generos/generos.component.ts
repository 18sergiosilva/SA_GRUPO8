import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generos',
  templateUrl: './generos.component.html',
  styleUrls: ['./generos.component.scss']
})
export class GenerosComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }
  productos = [];
  productos_temp = [];
  url = '../assets/generos.jpg';
  nuevo_genero: string;

  ngOnInit() {
    if(localStorage.getItem('logged') === '0'){
      this.router.navigate(['login']);
    }
    this.getData();

  }

  getData() {
    this.productos = [];
    try {
      this.http.get('http://18.118.255.26:3000/generos/getAllGenders')
        .toPromise().then((data: any) => {
          this.productos = data.data;
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
  }

  cancelar() {
      this.nuevo_genero = '';
  }

  agregar() {
    const headers = new HttpHeaders();
    headers.set('usuario', localStorage.getItem('username'))
    this.http.post('http://18.118.255.26:3000/generos',
      {
        "genero": this.nuevo_genero
      }).toPromise().then((data: any) => {
        console.log(data);
        this.cancelar();
        this.getData();
      });
  }

}
