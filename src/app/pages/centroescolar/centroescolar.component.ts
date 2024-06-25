import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { BooksService } from '../../services/catalogolibros/books.service';
import { PagosService } from '../../services/centroescolar/pagos.service';
import { StudentsService } from '../../services/estudiantes/students.service';
import { ClasesService } from '../../services/materias/clases.service';
@Component({
  selector: 'app-centroescolar',
  templateUrl: './centroescolar.component.html',
  styleUrls: ['./centroescolar.component.css']
})
export class CentroescolarComponent implements OnInit {

  constructor(private _pagoConcepto: PagosService, private _bookService: BooksService, private _studentService : StudentsService, private _claseService: ClasesService) { }

  
datee = new Date();
public datosCE={
  fecha: "",
  folio:0,
  seccion:"",
  alumno:"",
  concepto:"",
  materiaUno:"",
  materiaDos:"",
  materiaTres:"",
  materiaCuatro:"",
  materiaCinco:"",
  libroUno:"",
  libroDos:"",
  libroTres:"",
  libroCuatro:"",
  libroCinco:"",
  afterUno:"",
  afterDos:"",
  otrosIngresos:"",
  contador:"",
  pagoTotal: 0
};
public search="";
public findEstudent="";
public activo =true;
public notaPDF :any=[];
public librosAll :any=[];
public materiasAll :any=[];
public precioLibroUno=0;
public precioLibroDos=0;
public precioLibroTres=0;
public precioLibroCuatro=0;
public precioLibroCinco=0;
public pasgosERR=0;
public pagosBooks=0;
public eermaterias=false;
public otrosIngresos = false;
public afterSchool=false
public librosPagos=false;
public OtrosPagos=false;
public tipoConcepto:any;
public constanciasPrecio:any;

///////////////// listas para el buscador /////////////////

public listaEstudiantes:any =[];
public listFiltered=[];
public mmm=[];
searchTerm$ = new Subject<string>();

//////////////////////////////////////////////////////////

  ngOnInit(): void {
    this.datosCE.fecha = new Date().toISOString().split('T')[0];
    this.obtenerFolio();
    this.obtenerBooks();
    this.getEstudiantes();
    this.filterList();
  }

 

  getEstudiantes(){
    this._studentService.obtenerStudents().subscribe((resp:any)=>{
      this.cargarEstudiante(resp.getStudents);
    });

    // console.log(this.listaEstudiantes);
    
  }
  cargarEstudiante(data:any){
    data.forEach((element:any) => {
      this.listaEstudiantes.push(element.nombreCompleto)
    });
  }
  
  filterList(): void {
    this.searchTerm$.subscribe(term => {
      this.listFiltered = this.listaEstudiantes
        .filter(item => item.toLowerCase().indexOf(term.toLowerCase()) >= 0);
    });
  }

  obtenerFolio(){
    this._pagoConcepto.getUltimoFolio().subscribe((resp:any)=>{
      this.datosCE.folio = resp.getUltimoFolio[0].folio +1;
    })
    this.datosCE.contador = localStorage.getItem("user");
  }

  obtenerBooks(){
    this._bookService.obtenerLibros().subscribe((resp:any)=>{
      this.librosAll =resp.getBooks
      // console.log(this.librosAll);
      
    });
  }

  obtenerMaterias(){
    this._claseService.obtenerMate(this.datosCE.seccion).subscribe((resp:any)=>{
    this.cargarMaterias(resp.getMate);
    // this.mmm = resp.getMate;
    // console.log(this.mmm);
      // console.log(this.materiasAll);
    });
  }
  cargarMaterias(data:any){
    data.forEach((element:any) => {
      this.materiasAll.push(element)
    });
  }

  getBookName(){
    if(this.datosCE.libroUno != ""){
      this._bookService.libroName(this.datosCE.libroUno).subscribe((resp:any)=>{
        this.precioLibroUno = resp.getLibro[0].precio;
        
      });
    }
    // else if(this.datosCE.libroUno == ""){ this.datosCE.pagoTotal=0; this.precioLibroUno=0; this.pagosBooks=0;}
    if(this.datosCE.libroDos != ""){
      this._bookService.libroName(this.datosCE.libroDos).subscribe((resp:any)=>{
        this.precioLibroDos = resp.getLibro[0].precio;
       
      });
    }
    if(this.datosCE.libroTres != ""){
      this._bookService.libroName(this.datosCE.libroTres).subscribe((resp:any)=>{
        this.precioLibroTres = resp.getLibro[0].precio;
        
      });
    }
    if(this.datosCE.libroCuatro != ""){
      this._bookService.libroName(this.datosCE.libroCuatro).subscribe((resp:any)=>{
        this.precioLibroCuatro = resp.getLibro[0].precio;
       
      });
    }
    if(this.datosCE.libroCinco != ""){
      this._bookService.libroName(this.datosCE.libroCinco).subscribe((resp:any)=>{
        this.precioLibroCinco = resp.getLibro[0].precio;
        
      });
    }
    
  }

  conceptosIf(){
  if(this.datosCE.concepto=="EER"){
    this.obtenerMaterias();
      this.eermaterias = true;
      this.librosPagos = false;
      this.otrosIngresos = false;
      this.afterSchool = false;
      this.constanciasPrecio=0;
      this.datosCE.pagoTotal=0;
      this.pagosBooks=0;  
      this.datosCE.afterUno ="";
    this.datosCE.afterDos ="";
    this.datosCE.otrosIngresos ="";
  }
  if(this.datosCE.concepto=="Libros"){
    this.eermaterias = false;
    this.librosPagos = true;
    this.otrosIngresos = false;
    this.afterSchool = false;
    this.constanciasPrecio=0;
    this.datosCE.pagoTotal =0;
    this.datosCE.afterUno ="";
    this.datosCE.afterDos ="";
    this.datosCE.otrosIngresos ="";
  }
  if(this.datosCE.concepto=="Constancia estudios" || this.datosCE.concepto=="Certificado estudios parcial" || this.datosCE.concepto=="Certificado estudios normal"  ){
    this.eermaterias = false;
    this.librosPagos = false;
    this.otrosIngresos = false;
    this.afterSchool = false;
    this.constanciasPrecio=50;
    this.datosCE.pagoTotal =50;
    this.pagosBooks=0;
    this.datosCE.afterUno ="";
    this.datosCE.afterDos ="";
    this.datosCE.otrosIngresos ="";
  }
  if(this.datosCE.concepto=="Certificado estudios parcial" || this.datosCE.concepto=="Certificado estudios normal"  ){
    this.eermaterias = false;
    this.librosPagos = false;
    this.otrosIngresos = false;
    this.afterSchool = false;
    this.constanciasPrecio=100;
    this.datosCE.pagoTotal =100;
    this.pagosBooks=0;
    this.datosCE.afterUno ="";
    this.datosCE.afterDos ="";
    this.datosCE.otrosIngresos ="";
  }
  if(this.datosCE.concepto =="Otros Ingresos"){
    this.eermaterias = false;
    this.librosPagos = false;
    this.afterSchool = false;
    this.otrosIngresos = true;
    this.constanciasPrecio=0;
    this.datosCE.pagoTotal =0;
    this.pagosBooks=0;  
    this.activo = false;
    this.datosCE.afterUno ="";
    this.datosCE.afterDos ="";
   
  }
  if(this.datosCE.concepto =="After School"){
    this.eermaterias = false;
    this.librosPagos = false;
    this.otrosIngresos = false;
    this.afterSchool = true;
    this.constanciasPrecio=0;
    this.datosCE.pagoTotal =0;
    this.pagosBooks=0;  
    this.activo = false;
    this.datosCE.otrosIngresos ="";
  }
  
  }

  getPagosBook(){
    if(this.datosCE.libroUno!=""){
      this.pagosBooks = this.pagosBooks + this.precioLibroUno;
    }
    if(this.datosCE.libroDos!=""){
      this.pagosBooks = this.pagosBooks + this.precioLibroDos;
    }
    if(this.datosCE.libroTres!=""){
      this.pagosBooks = this.pagosBooks + this.precioLibroTres;
    }
    if(this.datosCE.libroCuatro!=""){
      this.pagosBooks = this.pagosBooks + this.precioLibroCuatro;
    }
    if(this.datosCE.libroCinco!=""){
      this.pagosBooks = this.pagosBooks + this.precioLibroCinco;
    }
    
    this.datosCE.pagoTotal =this.pagosBooks;
  }
  
  getPagos(){
    if(this.datosCE.materiaUno!=""){
      this.pasgosERR = this.pasgosERR + 100;
    }
    else if(this.datosCE.materiaDos!=""){
      this.pasgosERR = this.pasgosERR + 100;
    }
    else if(this.datosCE.materiaTres!=""){
      this.pasgosERR = this.pasgosERR + 100;
    }
    else if(this.datosCE.materiaCuatro!=""){
      this.pasgosERR = this.pasgosERR + 100;
    }
    else if(this.datosCE.materiaCinco!=""){
      this.pasgosERR = this.pasgosERR + 100;
    }
    
    this.datosCE.pagoTotal =this.pasgosERR;
  }

  // getPagosBook(){

  //   if(this.datosCE.libroUno!=""){
  //     this.pagosBooks = this.pagosBooks + this.precioLibroUno;
  //   }
  //   else if(this.datosCE.libroDos!=""){
  //     this.pagosBooks = this.pagosBooks + this.precioLibroDos;
  //   }
  //   else if(this.datosCE.libroTres!=""){
  //     this.pagosBooks = this.pagosBooks + this.precioLibroTres;
  //   }
  //   else if(this.datosCE.libroCuatro!=""){
  //     this.pagosBooks = this.pagosBooks + this.precioLibroCuatro;
  //   }
  //   else if(this.datosCE.libroCinco!=""){
  //     this.pagosBooks = this.pagosBooks + this.precioLibroCinco;
  //   }
    
  //   this.datosCE.pagoTotal =this.pagosBooks;
  // }

  fuctionMayus(e){
    e.value = e.value.toUpperCase()
  }

  ticket(){
    
    // // console.log(this.datosCE);
    // this._pagoConcepto.agregarVenta(this.datosCE).subscribe((resp:any)=>{
    //   // console.log(resp);
    // })
    // Swal.fire({
    //   icon: "success",
    //   title: "PAGO REGISTRADO",
    //   showConfirmButton: false,
    //   timer: 1500
    // });
    Swal.fire({
      title: "¿Desea guardar datos?",
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: "Cancelar"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
       this._pagoConcepto.agregarVenta(this.datosCE).subscribe((resp:any)=>{
      // console.log(resp);
    })
    Swal.fire({
      icon: "success",
      title: "PAGO REGISTRADO",
      showConfirmButton: false,
      timer: 1500
    });
    this.obtenerFolio();
      } else if (result.isDenied) {
        Swal.fire({
          icon: "info",
          title: "PAGO CANCELADO",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
    this.notaPDF.push(this.datosCE);
    this.reciboPDF();
    this.datosCE.concepto="";
    this.datosCE.alumno ="";
    this.findEstudent ="";
    this.datosCE.seccion ="";
    this.eermaterias = false;
    this.librosPagos = false;
    this.otrosIngresos = false;
    this.afterSchool = false;
    this.constanciasPrecio=0;
    this.datosCE.pagoTotal =0;
    this.pasgosERR=0;
    this.pagosBooks=0;
    this.precioLibroUno=0;
    this.precioLibroDos=0;
    this.precioLibroTres=0;
    this.precioLibroCuatro=0;
    this.precioLibroCinco=0;
    this.materiasAll=[];
    this.activo=true;
    this.obtenerFolio();
  }

  reciboPDF(){
    const doc : any = new jsPDF();
    const data : any =[];
    var contador =1;
    this.notaPDF.forEach((element:any) => {

      if(element.concepto =="Constancia estudios" || element.concepto =="Certificado estudios parcial" || element.concepto =="Certificado estudios normal"){
        doc.setTextColor(0);
        doc.setFontSize(25);
        doc.setFont('courier')                                       //X,Y , ANCHO, ALTO
        doc.addImage('./assets/images/background/logo-08.png', 'JPEG', 0, 5, 50, 25);
        doc.text('Fundación El Peñón I.A.P.', 40, 20);
        doc.setTextColor(50);
        doc.setFontSize(10);
        doc.text('Tel. 73535543, 3551210.', 80, 30);
        doc.text('Av. San Jose María Escrivá de Balaguer s/n Jonacatepec, Morelos.', 40,25);
        doc.setFontSize(15);
        doc.text('RECIBO: N° '+ element.folio, 10,45);
        doc.text('SECCIÓN :'+ element.seccion, 130,45);
        doc.text('FECHA: '+ element.fecha,10,55);
        doc.text('ALUMNO: '+ element.alumno,10,60);
        doc.setFontSize(15);
        doc.text('CONCEPTO',82,70);
        doc.text('IMPORTE',150,70);
        doc.text(element.concepto,20,80);
        doc.text('$ '+element.pagoTotal,150,80);
        doc.setFontSize(10);
        doc.text(localStorage.getItem('user'),70,95);
        doc.text('Copia',10,100);
        doc.text('_________________________________',70,100);
        doc.text('FIRMA AUTORIZADA',87,105);
        doc.addImage('./assets/images/background/paid.jpg', 'JPEG', 123, 85, 50, 20);
        doc.text('___________________________________________________________________________________________________________',1,107);
        doc.setFontSize(25);
        doc.setFont('courier')
        doc.addImage('./assets/images/background/logo-08.png', 'JPEG', 0, 110, 50, 25);
        doc.text('Fundación El Peñón I.A.P.', 40, 125);
        doc.setTextColor(50);
        doc.setFontSize(10);
        doc.text('Tel. 73535543, 3551210.', 80, 135);
        doc.text('Av. San Jose María Escrivá de Balaguer s/n Jonacatepec, Morelos.', 40,130);
        doc.setFontSize(15);
        doc.text('RECIBO: N° '+ element.folio, 10,155);
        doc.text('SECCIÓN :'+ element.seccion, 130,155);
        doc.text('FECHA: '+ element.fecha,10,165);
        doc.text('ALUMNO: '+ element.alumno,10,170);
        doc.setFontSize(15);
        doc.text('CONCEPTO',82,180);
        doc.text('IMPORTE',150,180);
        doc.text(element.concepto,20,190);
        doc.text('$ '+element.pagoTotal,150,190);
        doc.setFontSize(10);
        doc.text(localStorage.getItem('user'),70,205);
        doc.text('Original',10,210);
        doc.text('_________________________________',70,210);
        doc.text('FIRMA AUTORIZADA',87,215);
        doc.addImage('./assets/images/background/paid.jpg', 'JPEG', 123, 200, 50, 20);
        doc.output('dataurlnewwindow')
      }
      else if (element.concepto =="Libros"){
        doc.setTextColor(0);
        doc.setFontSize(25);
        doc.setFont('courier')                                       //X,Y , ANCHO, ALTO
        doc.addImage('./assets/images/background/logo-08.png', 'JPEG', 0, 5, 50, 25);
        doc.text('Fundación El Peñón I.A.P.', 40, 20);
        doc.setTextColor(50);
        doc.setFontSize(10);
        doc.text('Tel. 73535543, 3551210.', 80, 30);
        doc.text('Av. San Jose María Escrivá de Balaguer s/n Jonacatepec, Morelos.', 40,25);
        doc.setFontSize(15);
        doc.text('RECIBO: N° '+ element.folio, 10,45);
        doc.text('SECCIÓN :'+ element.seccion, 130,45);
        doc.text('FECHA: '+ element.fecha,10,55);
        doc.text('ALUMNO: '+ element.alumno,10,60);
        doc.setFontSize(15);
        doc.text('CONCEPTO',82,70);
        doc.text('IMPORTE',160,70);
        if(element.libroUno!=""){
          doc.text('$ '+this.precioLibroUno,160,80);
        }
        if(element.libroDos!=""){
          doc.text('$ '+this.precioLibroDos,160,85);
        }
        if(element.libroTres!=""){ 
          doc.text('$ '+this.precioLibroTres,160,90);
        }
        if(element.libroCuatro!=""){
          doc.text('$ '+this.precioLibroCuatro,160,95);
        }
        if(element.libroCinco!=""){
          doc.text('$ '+this.precioLibroCinco,160,100);
        }
        doc.text(element.libroUno,20,80);
        doc.text(element.libroDos,20,85);
        doc.text(element.libroTres,20,90);
        doc.text(element.libroCuatro,20,95);
        doc.text(element.libroCinco,20,100);
        doc.text('$ '+element.pagoTotal,160,110);
        doc.setFontSize(10);
        doc.text(localStorage.getItem('user'),70,115);
        doc.text('Copia',10,120);
        doc.text('_________________________________',70,120);
        doc.text('FIRMA AUTORIZADA',87,125);
        doc.addImage('./assets/images/background/paid.jpg', 'JPEG', 123, 113, 50, 20);
        doc.text('___________________________________________________________________________________________________________',1,132);
        doc.setFontSize(25);
        doc.setFont('courier')
        doc.addImage('./assets/images/background/logo-08.png', 'JPEG', 0, 137, 50, 25);
        doc.text('Fundación El Peñón I.A.P.', 40, 150);
        doc.setTextColor(50);
        doc.setFontSize(10);
        doc.text('Tel. 73535543, 3551210.', 80, 160);
        doc.text('Av. San Jose María Escrivá de Balaguer s/n Jonacatepec, Morelos.', 40,155);
        doc.setFontSize(15);
        doc.text('RECIBO: N° '+ element.folio, 10,170);
        doc.text('SECCIÓN :'+ element.seccion, 130,170);
        doc.text('FECHA: '+ element.fecha,10,180);
        doc.text('ALUMNO: '+ element.alumno,10,185);
        doc.setFontSize(15);
        doc.text('CONCEPTO',82,195);
        doc.text('IMPORTE',150,195);
        if(element.libroUno!=""){          
          doc.text('$ '+this.precioLibroUno,150,205);          
        }
        if(element.libroDos!=""){
          doc.text('$ '+this.precioLibroDos,150,210);          
        }
        if(element.libroTres!=""){
          doc.text('$ '+this.precioLibroTres,150,215);
        }
        if(element.libroCuatro!=""){          
          doc.text('$ '+this.precioLibroCuatro,150,220);
        }
        if(element.libroCinco!=""){          
          doc.text('$ '+this.precioLibroCinco,150,225);
        }
        doc.text(element.libroUno,20,205);
        doc.text(element.libroDos,20,210);
        doc.text(element.libroTres,20,215);
        doc.text(element.libroCuatro,20,220);
        doc.text(element.libroCinco,20,225);
        doc.text('$ '+element.pagoTotal,160,235);
        doc.setFontSize(10);
        doc.text(localStorage.getItem('user'),70,240);
        doc.text('Original',10,245);
        doc.text('_________________________________',70,245);
        doc.text('FIRMA AUTORIZADA',87,250);
        doc.addImage('./assets/images/background/paid.jpg', 'JPEG', 123, 235, 50, 20);
        doc.output('dataurlnewwindow')
  this.datosCE.libroUno="";
  this.datosCE.libroDos="";
  this.datosCE.libroTres="";
  this.datosCE.libroCuatro="";
  this.datosCE.libroCinco="";
      }
      else if (element.concepto =="EER"){
        doc.setTextColor(0);
        doc.setFontSize(25);
        doc.setFont('courier')                                       //X,Y , ANCHO, ALTO
        doc.addImage('./assets/images/background/logo-08.png', 'JPEG', 0, 5, 50, 25);
        doc.text('Fundación El Peñón I.A.P.', 40, 20);
        doc.setTextColor(50);
        doc.setFontSize(10);
        doc.text('Tel. 73535543, 3551210.', 80, 30);
        doc.text('Av. San Jose María Escrivá de Balaguer s/n Jonacatepec, Morelos.', 40,25);
        doc.setFontSize(15);
        doc.text('RECIBO: N° '+ element.folio, 10,45);
        doc.text('SECCIÓN :'+ element.seccion, 130,45);
        doc.text('FECHA: '+ element.fecha,10,55);
        doc.text('ALUMNO: '+ element.alumno,10,60);
        doc.setFontSize(15);
        doc.text('CONCEPTO',82,70);
        doc.text('IMPORTE',160,70);
        if(element.materiaUno!=""){
          doc.text('$ 100',160,80);
        }
        if(element.materiaDos!=""){
          doc.text('$ 100',160,85);
        }
        if(element.materiaTres!=""){ 
          doc.text('$ 100',160,90);
        }
        if(element.materiaCuatro!=""){
          doc.text('$ 100',160,95);
        }
        if(element.materiaCinco!=""){
          doc.text('$ 100',160,100);
        }
        doc.text(element.materiaUno,20,80);
        doc.text(element.materiaDos,20,85);
        doc.text(element.materiaTres,20,90);
        doc.text(element.materiaCuatro,20,95);
        doc.text(element.materiaCinco,20,100);
        doc.text('TOTAL: $ '+element.pagoTotal,140,110);
        doc.setFontSize(10);
        doc.text(localStorage.getItem('user'),70,115);
        doc.text('Copia',10,120);
        doc.text('_________________________________',70,120);
        doc.text('FIRMA AUTORIZADA',87,125);
        doc.addImage('./assets/images/background/paid.jpg', 'JPEG', 123, 113, 50, 20);
        doc.text('___________________________________________________________________________________________________________',1,132);
        doc.setFontSize(25);
        doc.setFont('courier')
        doc.addImage('./assets/images/background/logo-08.png', 'JPEG', 0, 137, 50, 25);
        doc.text('Fundación El Peñón I.A.P.', 40, 150);
        doc.setTextColor(50);
        doc.setFontSize(10);
        doc.text('Tel. 73535543, 3551210.', 80, 160);
        doc.text('Av. San Jose María Escrivá de Balaguer s/n Jonacatepec, Morelos.', 40,155);
        doc.setFontSize(15);
        doc.text('RECIBO: N° '+ element.folio, 10,170);
        doc.text('SECCIÓN :'+ element.seccion, 130,170);
        doc.text('FECHA: '+ element.fecha,10,180);
        doc.text('ALUMNO: '+ element.alumno,10,185);
        doc.setFontSize(15);
        doc.text('CONCEPTO',82,195);
        doc.text('IMPORTE',150,195);
        if(element.materiaUno!=""){          
          doc.text('$ 100',150,205);          
        }
        if(element.materiaDos!=""){
          doc.text('$ 100',150,210);          
        }
        if(element.materiaTres!=""){
          doc.text('$ 100',150,215);
        }
        if(element.materiaCuatro!=""){          
          doc.text('$ 100',150,220);
        }
        if(element.materiaCinco!=""){          
          doc.text('$ 100',150,225);
        }
        doc.text(element.materiaUno,20,205);
        doc.text(element.materiaDos,20,210);
        doc.text(element.materiaTres,20,215);
        doc.text(element.materiaCuatro,20,220);
        doc.text(element.materiaCinco,20,225);
        doc.text('TOTAL: $ '+element.pagoTotal,140,235);
        doc.setFontSize(10);
        doc.text(localStorage.getItem('user'),70,240);
        doc.text('Original',10,245);
        doc.text('_________________________________',70,245);
        doc.text('FIRMA AUTORIZADA',87,250);
        doc.addImage('./assets/images/background/paid.jpg', 'JPEG', 123, 235, 50, 20);
        doc.output('dataurlnewwindow')

        this.datosCE.materiaUno="";
        this.datosCE.materiaDos="";
        this.datosCE.materiaTres="";
        this.datosCE.materiaCuatro="";
        this.datosCE.materiaCinco="";
        
      }

      else if (element.concepto =="Otros Ingresos"){
        doc.setTextColor(0);
        doc.setFontSize(25);
        doc.setFont('courier')                                       //X,Y , ANCHO, ALTO
        doc.addImage('./assets/images/background/logo-08.png', 'JPEG', 0, 5, 50, 25);
        doc.text('Fundación El Peñón I.A.P.', 40, 20);
        doc.setTextColor(50);
        doc.setFontSize(10);
        doc.text('Tel. 73535543, 3551210.', 80, 30);
        doc.text('Av. San Jose María Escrivá de Balaguer s/n Jonacatepec, Morelos.', 40,25);
        doc.setFontSize(15);
        doc.text('RECIBO: N° '+ element.folio, 10,45);
        doc.text('SECCIÓN :'+ element.seccion, 130,45);
        doc.text('FECHA: '+ element.fecha,10,55);
        doc.text('ALUMNO: '+ element.alumno,10,60);
        doc.setFontSize(15);
        doc.text('CONCEPTO',82,70);
        doc.text('IMPORTE',160,70);
      
        doc.text(element.otrosIngresos,20,85);
        
        doc.text('TOTAL: $ '+element.pagoTotal,140,110);
        doc.setFontSize(10);
        doc.text(localStorage.getItem('user'),70,115);
        doc.text('Copia',10,120);
        doc.text('_________________________________',70,120);
        doc.text('FIRMA AUTORIZADA',87,125);
        doc.addImage('./assets/images/background/paid.jpg', 'JPEG', 123, 113, 50, 20);
        doc.text('___________________________________________________________________________________________________________',1,132);
        doc.setFontSize(25);
        doc.setFont('courier')
        doc.addImage('./assets/images/background/logo-08.png', 'JPEG', 0, 137, 50, 25);
        doc.text('Fundación El Peñón I.A.P.', 40, 150);
        doc.setTextColor(50);
        doc.setFontSize(10);
        doc.text('Tel. 73535543, 3551210.', 80, 160);
        doc.text('Av. San Jose María Escrivá de Balaguer s/n Jonacatepec, Morelos.', 40,155);
        doc.setFontSize(15);
        doc.text('RECIBO: N° '+ element.folio, 10,170);
        doc.text('SECCIÓN :'+ element.seccion, 130,170);
        doc.text('FECHA: '+ element.fecha,10,180);
        doc.text('ALUMNO: '+ element.alumno,10,185);
        doc.setFontSize(15);
        doc.text('CONCEPTO',82,195);
        doc.text('IMPORTE',150,195);
        
        doc.text(element.otrosIngresos,20,210);
   
        doc.text('TOTAL: $ '+element.pagoTotal,140,235);
        doc.setFontSize(10);
        doc.text(localStorage.getItem('user'),70,240);
        doc.text('Original',10,245);
        doc.text('_________________________________',70,245);
        doc.text('FIRMA AUTORIZADA',87,250);
        doc.addImage('./assets/images/background/paid.jpg', 'JPEG', 123, 235, 50, 20);
        doc.output('dataurlnewwindow')
        this.datosCE.otrosIngresos =""
        
      }

      else if (element.concepto =="After School"){
        doc.setTextColor(0);
        doc.setFontSize(25);
        doc.setFont('courier')                                       //X,Y , ANCHO, ALTO
        doc.addImage('./assets/images/background/logo-08.png', 'JPEG', 0, 5, 50, 25);
        doc.text('Fundación El Peñón I.A.P.', 40, 20);
        doc.setTextColor(50);
        doc.setFontSize(10);
        doc.text('Tel. 73535543, 3551210.', 80, 30);
        doc.text('Av. San Jose María Escrivá de Balaguer s/n Jonacatepec, Morelos.', 40,25);
        doc.setFontSize(15);
        doc.text('RECIBO: N° '+ element.folio, 10,45);
        doc.text('SECCIÓN :'+ element.seccion, 130,45);
        doc.text('FECHA: '+ element.fecha,10,55);
        doc.text('ALUMNO: '+ element.alumno,10,60);
        doc.setFontSize(15);
        doc.text('CONCEPTO',82,70);
        doc.text('IMPORTE',160,70);
      
        doc.text(element.afterUno,20,85);
        doc.text(element.afterDos,20,90);
        doc.text('TOTAL: $ '+element.pagoTotal,140,110);
        doc.setFontSize(10);
        doc.text(localStorage.getItem('user'),70,115);
        doc.text('Copia',10,120);
        doc.text('_________________________________',70,120);
        doc.text('FIRMA AUTORIZADA',87,125);
        doc.addImage('./assets/images/background/paid.jpg', 'JPEG', 123, 113, 50, 20);
        doc.text('___________________________________________________________________________________________________________',1,132);
        doc.setFontSize(25);
        doc.setFont('courier')
        doc.addImage('./assets/images/background/logo-08.png', 'JPEG', 0, 137, 50, 25);
        doc.text('Fundación El Peñón I.A.P.', 40, 150);
        doc.setTextColor(50);
        doc.setFontSize(10);
        doc.text('Tel. 73535543, 3551210.', 80, 160);
        doc.text('Av. San Jose María Escrivá de Balaguer s/n Jonacatepec, Morelos.', 40,155);
        doc.setFontSize(15);
        doc.text('RECIBO: N° '+ element.folio, 10,170);
        doc.text('SECCIÓN :'+ element.seccion, 130,170);
        doc.text('FECHA: '+ element.fecha,10,180);
        doc.text('ALUMNO: '+ element.alumno,10,185);
        doc.setFontSize(15);
        doc.text('CONCEPTO',82,195);
        doc.text('IMPORTE',150,195);
        
        doc.text(element.afterUno,20,210);
        doc.text(element.afterDos,20,215);
        doc.text('TOTAL: $ '+element.pagoTotal,140,235);
        doc.setFontSize(10);
        doc.text(localStorage.getItem('user'),70,240);
        doc.text('Original',10,245);
        doc.text('_________________________________',70,245);
        doc.text('FIRMA AUTORIZADA',87,250);
        doc.addImage('./assets/images/background/paid.jpg', 'JPEG', 123, 235, 50, 20);
        doc.output('dataurlnewwindow')
        this.datosCE.afterUno =""
        this.datosCE.afterDos =""
      }
      
      
    });

  }
}
