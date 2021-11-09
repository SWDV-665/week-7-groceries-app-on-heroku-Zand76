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
      quantity: 3
    },
    {
      name: "Juice",
      quantity: 4
    },
  ];

  constructor(public navCtrl: NavController, public toastController: ToastController, public alertController: AlertController) {
  }

  //Removing Items from Grocery List
  removeItem(item, index) {
    console.log("Delete clicked - ", item, index);
    const toast = this.toastController.create({
      message: 'Removing Item - ' + item.name + "...",
      duration: 5000
    });
    toast.present();
    this.items.splice(index, 1);
  }

  editItem(item, index) {
    console.log("Edit clicked - ", item, index);
    this.showEditItemPrompt(item, index);
  }

  //Adding Items to Grocery List
  addItem() {
    console.log("Add clicked");
    this.showAddItemPrompt();
  }

  //Add items via alert form
  showAddItemPrompt() {
    const prompt = this.alertController.create({
      title: "Add Item",
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
          text: 'save',
          handler: item => {
            console.log('Save clicked', item.name);
            const toast = this.toastController.create({
              message: 'Adding Item - ' + item.name + "...",
              duration: 5000
            });
            toast.present();
            this.items.push(item);
          }
        },
        {
          text: 'cancel',
          handler: item => {
            console.log('Cancel clicked');
            const toast = this.toastController.create({
              message: 'Canceling...',
              duration: 5000
            });
            toast.present();
          },
        },
      ]
    });
    prompt.present();
  }
  //Edit items via alert form
  showEditItemPrompt(item, index) {
    const prompt = this.alertController.create({
      title: "Edit Item",
      message: "Please edit item...",
      inputs: [
        {
          name: 'name',
          placeholder: 'name',
          value: item.name
        },
        {
          name: 'quantity',
          placeholder: 'quantity',
          value: item.quantity
        },
      ],
      buttons: [
        {
          text: 'save',
          handler: item => {
            console.log('Save clicked - ', item.name);
            const toast = this.toastController.create({
              message: 'Editing Item - ' + item.name + "...",
              duration: 5000
            });
            toast.present();
            this.items[index] = item;
          }
        },
        {
          text: 'cancel',
          handler: item => {
            console.log('Cancel clicked - ', item.name);
            const toast = this.toastController.create({
              message: 'Canceling...',
              duration: 5000
            });
            toast.present();
          },
        },
      ]
    });
    prompt.present();
  }
}
