import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'poster'
})
export class PosterPipe implements PipeTransform {

  transform( poster: string ): string {

    //http://image.tmdb.org/t/p/w500{{ movie.poster_path }}" alt="{{ movie.title }}

    if ( poster ){
      return `http://image.tmdb.org/t/p/w500${ poster }`;
    }else{
      return './assets/no-image.jpg';

    }

  }

}
