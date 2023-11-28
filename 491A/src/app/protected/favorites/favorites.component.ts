import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  //testing something
  opened = false;

  constructor() { }

  ngOnInit(): void {
  }
  toggleSidenav() {
    this.opened = !this.opened;
  }

}
