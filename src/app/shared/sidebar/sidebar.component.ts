import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private gifsService: GifsService
  ) { }

  get historial(){
    return this.gifsService.historial;
  }

  ngOnInit(): void {
  }

  buscar(item:string){
    this.gifsService.buscarGifs(item);
  }

}
