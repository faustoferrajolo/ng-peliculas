import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { CarteleraResp } from '../interfaces/cartelera-response';
import { Movie } from '../interfaces/cartelera-response';
import { MovieDetails } from '../interfaces/movie-details';
import { CreditResp, Cast } from '../interfaces/credits-response';


@Injectable({
  providedIn: 'root'
})



export class PeliculasService {

  private baseURL: string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;

  public loading: boolean = false;

  constructor( private http: HttpClient) {   }

  get params(){
    return{
      api_key: 'b29b1cdde10fdc73bad6af8f7a6bf76f',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }

  }

  getCartelera(): Observable<CarteleraResp>{

    if (this.loading){
      return;
    }

    this.loading = true;

    return this.http.get<CarteleraResp>(`${this.baseURL}/movie/now_playing`, {
      params: this.params
    }).pipe(
      tap( ()=> {
        this.carteleraPage += 1;
        this.loading = false;
        console.log(this.carteleraPage);
      })
    );

  }


  buscarPeliculas( texto: string ): Observable<Movie[]> {
    const params = {...this.params, page: '1', query: texto };

    //https://api.themoviedb.org/3/search/movie?api_key=b29b1cdde10fdc73bad6af8f7a6bf76f&language=es-ES&query=avengers&page=1&include_adult=true
    return this.http.get<CarteleraResp>(`${this.baseURL}/search/movie`, {
      params
    }).pipe(
      map( resp => resp.results )
    );



  }

  getPeliculaDetails( id: string ){

    //https://api.themoviedb.org/3/movie/611914?api_key=b29b1cdde10fdc73bad6af8f7a6bf76f&language=en-US

    return this.http.get<MovieDetails>(`${this.baseURL}/movie/${ id }`, {
      params: this.params
    }).pipe(
      catchError( err => of(null))
    );
  }

  getCasting( movieId: string ):Observable<Cast[]>{

    //https://api.themoviedb.org/3/movie/651571/credits?api_key=b29b1cdde10fdc73bad6af8f7a6bf76f&language=es-ES
    return this.http.get<CreditResp>(`${this.baseURL}/movie/${movieId}/credits`, {
      params: this.params
    }).pipe(
      map( resp => resp.cast ),
      catchError( err => of([])),
    );
  }
}
