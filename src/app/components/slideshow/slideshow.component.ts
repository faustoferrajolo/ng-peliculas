import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Swiper } from 'swiper';
import { Movie } from '../../interfaces/cartelera-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() movies: Movie[];
  public mySwiper: Swiper;

  constructor( private router: Router ) { }


  ngAfterViewInit(): void {
    this.mySwiper = new Swiper('.swiper-container', {
      // Optional parameters
      loop: true,

    });





  }

  ngOnInit(): void {
    //console.log(this.movies);
  }


  onSlidePrev(){

    this.mySwiper.slidePrev();

  }

  onSlideNext(){

    this.mySwiper.slideNext();


  }

  onMovieClick( movie: Movie ){

    //console.log(movie);
    this.router.navigate([ 'pelicula', movie.id ]);
  }
}
