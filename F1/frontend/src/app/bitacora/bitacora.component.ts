import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Utils } from '../utils/utils';


@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.scss']
})
export class BitacoraComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  // Declaraciones
  historial = [];
  tabletitle="HISTORIAL DE TRANSACCIONES"
  expandContent = true;

  
  endpoint = "http://balanceadorsa-1168785242.us-east-2.elb.amazonaws.com:3002/allbitacoras";

  ngOnInit() {
    if(localStorage.getItem('logged') === '0'){
      this.router.navigate(['login']);
    }
    this.cargarBitacora();
  }

  cargarBitacora(): boolean {
    this.http.get(this.endpoint)
      .toPromise().then((data: any) => {
        console.log(data.data);
        this.historial = data;
      });
    return true;
  }
}
