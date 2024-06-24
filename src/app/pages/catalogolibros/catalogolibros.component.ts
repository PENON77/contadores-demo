import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { BooksService } from '../../services/catalogolibros/books.service';

@Component({
  selector: 'app-catalogolibros',
  templateUrl: './catalogolibros.component.html',
  styleUrls: ['./catalogolibros.component.css']
})
export class CatalogolibrosComponent implements OnInit {

  public datosLibro={
    titulo:"",
    precio:0
  }
  public dataBook:any=[]
  public booksRegistrados:any[]=[];
  constructor(private _books: BooksService) { }

  ngOnInit(): void {
    this.getLibros();
  }
getLibros(){
this._books.obtenerLibros().subscribe((resp:any)=>{
  this.dataBook = resp.getBooks;
  this.cargarBooks(resp.getBooks);
  // console.log(this.dataBook);
});
}
cargarBooks(data:any){
  data.forEach((element:any) => {
    this.booksRegistrados.push(element)
  });
  // console.log(this.booksRegistrados);
}

addBook(){
  this.booksRegistrados=[]
  this._books.agregarBook(this.datosLibro).subscribe((resp:any)=>{
    // console.log(resp);
    Swal.fire({
      icon: "success",
      title: "LIBRO AGREGADO A LA LISTA",
      showConfirmButton: false,
      timer: 1500
    });
    this.getLibros()
    })
    this.datosLibro.titulo="";
    this.datosLibro.precio=0;
    // location.reload();
    
}

deleteBook(id:any){
  Swal.fire({
    title: "¿ESTAS SEGURO DE ELIMINAR?",
    text: "Registro se eliminara de la nube",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si"
  }).then((result) => {
    if (result.isConfirmed) {
      this.booksRegistrados=[]
      this._books.eliminarBook(id).subscribe((resp:any)=>{
        
        Swal.fire({
          title: "ELIMINADO",
          text: "Tu regsitro ha sido eliminado",
          showConfirmButton: false,
          icon: "success",
          timer: 1500
        });
        this.getLibros();
      });
    }
  });  

}

}
