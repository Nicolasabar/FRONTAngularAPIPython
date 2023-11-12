import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource, MatTreeModule} from '@angular/material/tree';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { NestedTreeControl} from '@angular/cdk/tree';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatGridListModule} from '@angular/material/grid-list';
import { ApiService } from '../service/api.service';
import { FormsModule } from '@angular/forms';


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
  imports: [MatTreeModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatGridListModule, FormsModule ]
})
export class GetmenudataComponent implements OnInit {

  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();

  data: any[] = [];

  nombre : string = '';
  precio: number = 0;
  id_padre: number = 0;

  constructor(private apiService: ApiService) {
    
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
    this.apiService.addCategory(this.nombre, this.precio, this.id_padre).subscribe((response) => {
      console.log(response); // Puedes manejar la respuesta de la API según tus necesidades
    });
  }

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;
}
