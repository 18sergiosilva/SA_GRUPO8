import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }
  url = '../assets/Calculadora.jpg';
  nuevo_porcentaje: number;
  nuevo_pais: string;
  nuevo_precio: number;
  impuesto: number;
  total_impuesto: number;
  calculos = [];
  paises = ["Guatemala","El Salvador", "Mexico", "Estados Unidos", "España", "Canada", "Alemania", "Argentina", "Brasil", "Inglaterra", "Peru", "Ecuador", "Colombia", "Panama","Chile"];


  ngOnInit() {
    if(localStorage.getItem('logged') === '0'){
      this.router.navigate(['login']);
    }
  }


  agregar(){
    const headers = new HttpHeaders();
    headers.set('usuario', localStorage.getItem('username'))
    this.nuevo_porcentaje = this.getPorcentaje();
    this.http.post('http://balanceadorsa-1168785242.us-east-2.elb.amazonaws.com:3000/impuesto/calculate',
      {
        "porcentaje":this.nuevo_porcentaje,
        "precio":this.nuevo_precio,
        "pais":this.nuevo_pais
      }).toPromise().then((data: any) => {
        console.log(data);
        this.impuesto = data.data.totalImpuesto;
        this.total_impuesto = Number(this.impuesto) + Number(this.nuevo_precio);
      });
  }

  cancelar() {
    this.nuevo_pais = '';
    this.nuevo_precio = undefined;
    this.nuevo_porcentaje = undefined;
    this.impuesto = undefined;
}



getPorcentaje(): number {
  switch (this.nuevo_pais) {
    case "Guatemala":
      return 12;
    case "El Salvador":
      return 13;
    case "Mexico":
      return 16;
    case "Estados Unidos":
     return 7;
    case "España":
      return 21;
    case "Canada":
    return 5;
    case "Alemania":
    return 19;
    case "Argentina":
    return 21;
    case "Brasil":
    return 17;
    case "Inglaterra":
    return 20;
    case "Peru":
    return 18;
    case "Ecuador":
    return 12;
    case "Colombia":
    return 16;
    case "Panama":
    return 7;
    case "Chile":
    return 19;
  }
}

}


