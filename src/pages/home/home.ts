import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

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
    {
      name: "Juice",
      quantity: 3
    },

  ];

  constructor(public navCtrl: NavController, public toastController: ToastController, public alertController: AlertController) {
  }

  //Removing Items from Grocery List
  removeItem(item) {
    let index=this.items.indexOf(item);

    if(index > -1){
      this.items.splice(index, 1);
    }

    //Notification of changes
    console.log("Removing Item - ", item);
    const toast = this.toastController.create({
      message: 'Removing Item - ' + item.name + "...",
      duration: 3000
    });

    toast.present();
  }

  //Adding Items to Grocery List
  addItem(item) {
    console.log("Adding Item - ");
    this.showAddItemPrompt();
  }

  //Add items via alert form
  showAddItemPrompt() {
    const prompt = this.alertController.create({
      title: "Add Groceries",
      message: "Please enter item...",
      inputs: [
        {
          name: 'name',
          placeholder: 'name'
        },
        {
          name: 'quantity',
          placeholder: 'quantity'
        },
      ],
      buttons: [
        {
          text: 'add',
          handler: item => {
            console.log(item, ' added');
            this.items.push(item);
          }
        },
        {
          text: 'cancel',
          handler: item => {
            console.log('Cancel clicked', item);
          },
        },
      ]
    });
    prompt.present();
  }
}
