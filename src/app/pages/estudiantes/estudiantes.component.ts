import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { StudentsService } from '../../services/estudiantes/students.service';
import { ClasesService } from '../../services/materias/clases.service';
@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {

  public excelData:any;
  public excelDataM:any;
  public dataStudents={
    nombreCompleto:""
  };
  public dataMaterias={
    profesor:"",
    seccion:"",
    clase:"",
    union:""
  };
  constructor(private _studentService : StudentsService, private _calseService: ClasesService) { }

  ngOnInit(): void {
  }

  ReadExcel(event:any){
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);

    fileReader.onload = (elem)=>{
      var workBook = XLSX.read(fileReader.result,{type:'binary'})
      var sheetNames = workBook.SheetNames;
      this.excelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);
      
    }

  }

  importarData(){
    this.excelData.forEach(element => {
      // console.log(element.nombreCompleto);
    this.dataStudents.nombreCompleto = element.nombreCompleto;
      this._studentService.agregarStudents(this.dataStudents).subscribe((resp:any)=>{
                  // console.log(resp);
      });
    });

    Swal.fire({
        icon: "success",
        title: "DATOS GUARDADOS CON EXITO",
        showConfirmButton: false,
        timer: 1500
      });
  }



  ReadExcelMAT(event:any){
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);

    fileReader.onload = (elem)=>{
      var workBook = XLSX.read(fileReader.result,{type:'binary'})
      var sheetNames = workBook.SheetNames;
      this.excelDataM = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);
      
    }

  }

  importarMAT(){
    this.excelDataM.forEach(element => {
      // console.log(element.nombreCompleto);
    this.dataMaterias.profesor = element.Nombres;
    this.dataMaterias.seccion = element.Seccion;
    this.dataMaterias.clase = element.Clase;
    this.dataMaterias.union = element.union;
      this._calseService.agregarMate(this.dataMaterias).subscribe((resp:any)=>{
                  // console.log(resp);
      });
    });

    Swal.fire({
        icon: "success",
        title: "DATOS GUARDADOS CON EXITO",
        showConfirmButton: false,
        timer: 1500
      });
  }



}
