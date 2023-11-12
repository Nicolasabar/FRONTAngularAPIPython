import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { MatTreeNestedDataSource, MatTreeModule} from '@angular/material/tree';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { NestedTreeControl} from '@angular/cdk/tree';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatGridListModule} from '@angular/material/grid-list';
import { ApiService } from '../service/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface FoodNode {
  name: string;
  price: number;
  children?: FoodNode[];
}


@Component({
  selector: 'app-getmenudata',
  templateUrl: './getmenudata.component.html',
  styleUrls: ['./getmenudata.component.css'],
  standalone: true,
  imports: [CommonModule, MatTreeModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatGridListModule, FormsModule ]
})
export class GetmenudataComponent implements OnInit {

  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();

  data: any[] = [];

  nombre : string = '';
  precio: number = 0;
  id_padre: number = 0;

  mensajeValidacion: string = '';
  botonBloqueado: boolean = false;
  nombreValido: boolean = true;

  constructor(private apiService: ApiService, private zone: NgZone) {
    
  }


  ngOnInit(): void {
    this.llenardata();
  }


  llenardata(){
    this.apiService.getData().subscribe( data => {
      this.data = data;

      this.dataSource.data = data;
      this.treeControl.dataNodes = data;

    })
  }


  deleteCategory(id: number){
    this.apiService.deleteCategory(id).subscribe( data => {
      console.log('elemento eliminado');
    });
  }
  
  
  addCategory() {
    if (this.validarNombre() && this.validarLargoNombre()) {
      this.apiService.addCategory(this.nombre, this.precio, this.id_padre).subscribe((response) => {
        console.log(response); // Puedes manejar la respuesta de la API según tus necesidades
      });
      this.mensajeValidacion = '';
      this.botonBloqueado = false;
    } else {
      if (!this.validarNombre()) {
        this.mensajeValidacion = 'Nombre inválido. Solo se permiten letras.';
      } else {
        this.mensajeValidacion = 'Nombre demasiado largo. Máximo 10 caracteres.';
      }
      this.botonBloqueado = true;
    }
  
    // Forzamos la actualización de la vista dentro de la zona de Angular
    this.zone.run(() => {});
  }
  

  validarLargoNombre(): boolean {
    return this.nombre.length <= 10;
  }


  actualizarEstadoBoton() {
    this.botonBloqueado = !(this.validarNombre() && this.validarLargoNombre());
  }


  validarNombre(): boolean {
  // Expresión regular que acepta al menos un carácter, letras (mayúsculas y minúsculas), y espacios en blanco
  const regex = /^[a-zA-Z\s]+$/;
  this.nombreValido = regex.test(this.nombre) && this.validarLargoNombre();
  return this.nombreValido;
  }
  
  
  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;
}
