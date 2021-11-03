import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Grocery List"

  items = [
    {
      name: "Milk",
      quantity: 1
    },
    {
      name: "Bread",
      quantity: 2
    },
    {
      name: "Eggs",
      quantity: 24
    },

  ];

  constructor(public navCtrl: NavController) {

  }

}
