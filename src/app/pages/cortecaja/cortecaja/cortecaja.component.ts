import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2';
import { PagosService } from '../../../services/centroescolar/pagos.service';
@Component({
  selector: 'app-cortecaja',
  templateUrl: './cortecaja.component.html',
  styleUrls: ['./cortecaja.component.css']
})
export class CortecajaComponent implements OnInit {

  constructor( private _servicePagos: PagosService) { }

  public fechaInicio: any;
  public fechaFinal: any;
  public allFechas:any[]=[];
  public corteTotal=0;
  public findConcepto="";

  ngOnInit(): void {
  }

  buscarFechas(){
  
    if (this.findConcepto == "" && this.fechaInicio != undefined){

      this._servicePagos.obtenerFechas(this.fechaInicio).subscribe((resp:any )=>{
        this.cargarFechas(resp.getFecha);
        
        if(this.allFechas.length == 0){
          Swal.fire({
            icon: "error",
            title: "Ooops....",
            text:"No se encontraron datos con esa fecha",
            showConfirmButton: false,
            timer: 2000
          });
        }
      });
      this.allFechas=[];
    }
    else if (this.findConcepto != "" && this.fechaInicio != undefined){

      this._servicePagos.obtenerFechasConcepto(this.fechaInicio,this.findConcepto).subscribe((resp:any)=>{
        this.cargarFechas(resp.getFechCon);
        
        if(this.allFechas.length == 0){
          Swal.fire({
            icon: "error",
            title: "Ooops....",
            text:"No se encontraron datos con esa fecha",
            showConfirmButton: false,
            timer: 2000
          });
        }
      });
      this.allFechas=[];
    }

    else if (this.findConcepto != "" && this.fechaInicio == undefined){

      this._servicePagos.obtenerConcepto(this.findConcepto).subscribe((resp:any)=>{
        this.cargarFechas(resp.getConcepto);
        
        if(this.allFechas.length == 0){
          Swal.fire({
            icon: "error",
            title: "Ooops....",
            text:"No se encontraron datos con esa fecha",
            showConfirmButton: false,
            timer: 2000
          });
        }
      });
      this.allFechas=[];
    }

  }

  cargarFechas(data:any){
    data.forEach((element:any) => {
      this.allFechas.push(element)
    });

}

calcularTotal(){
  if(this.corteTotal == 0){
    this.allFechas.forEach((datos:any)=>{
      this.corteTotal =this.corteTotal+ datos.pagoTotal
    });
  }else {
    this.corteTotal =0;
  }
}



PDF(){
  const doc : any = new jsPDF({ orientation: 'landscape'});
    const data : any =[]
    var contador =1
    this.allFechas.forEach((element:any) => {
      var x =[
        contador,
      element.fecha,
      element.folio,
      element.concepto,
      element.pagoTotal,
      element.seccion,
      element.contador
    ]
    contador = contador + 1;
      data.push(x)
    });
    doc.setTextColor(100);
    doc.setFontSize(40);
    doc.setFont('courier')
    doc.text('CORTE DE CAJA', 90, 20);
    doc.autoTable({
      styles: { halign: 'center',font :'courier',fontSize:10 },
      columnStyles: {  halign: 'center',font :'courier',fontSize:12  },
      head:[["No.","FECHA","Folio","Concepto","Importe","Sección","usuario"]],
      body :data,
      startY:30
    });
    doc.setFontSize(14);
    doc.text('Corte Total $'+ this.corteTotal +" Pesos",20,200)

    doc.output('dataurlnewwindow')

}


}
