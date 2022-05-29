import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apikey:string = "PlHtnl4wlO9MSJvwKElq2uTIs1GMAfxB";
  private base_url:string = "https://api.giphy.com/v1/gifs";
  private _historial:string[] = [];

  public resultados: Gif[] = [];

  constructor(
    private http:HttpClient
  ){
    this._historial = JSON.parse(localStorage.getItem("historial")!) || [];
    this.resultados = JSON.parse(localStorage.getItem("resultados")!) || [];
  }

  get historial(){
   return[...this._historial];
  }

  buscarGifs(query:string){
    query = query.trim().toLocaleLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem("historial",JSON.stringify(this._historial));
    }
    const params = new HttpParams()
      .set('api_key',this.apikey)
      .set('limit','10')
      .set('q',query);

    this.http.get<SearchGifsResponse>(`${this.base_url}/search`,{params:params})
          .subscribe((response) => {
            console.log(response);
            this.resultados = response.data;
            localStorage.setItem("resultados",JSON.stringify(this.resultados));
          })
  }
}
