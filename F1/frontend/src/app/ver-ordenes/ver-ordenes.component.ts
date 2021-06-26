import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Utils } from '../utils/utils';


@Component({
  selector: 'app-ver-ordenes',
  templateUrl: './ver-ordenes.component.html',
  styleUrls: ['./ver-ordenes.component.scss']
})
export class VerOrdenesComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  // Declaraciones
  ordenes = [];
  tabletitle="LISTA DE ORDENES"
  expandContent = true;

  endpoint = "http://balanceadorsa-1168785242.us-east-2.elb.amazonaws.com:3004/ordenes/";

  ngOnInit() {
    if(localStorage.getItem('logged') === '0'){
      this.router.navigate(['login']);
    }
    this.cargarOrdenes();
  }

  cargarOrdenes(): boolean {
    this.http.get(this.endpoint)
      .toPromise().then((data: any) => {
        console.log(data.data);
        this.ordenes = data;
      });
    return true;
  }

  findDetails(data) {
    return this.ordenes.filter(x => x.whoseData === data._id);
  }

  expand(){
    this.expandContent = !this.expandContent
    }

}
