import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Grocery List"


  constructor(public navCtrl: NavController, public toastController: ToastController, public alertController: AlertController, public dataService: GroceriesServiceProvider, public inputDialogService: InputDialogServiceProvider) {
  }

  loadItems() {
    return this.dataService.getItems();
  }

  //Removing Items from Grocery List
  removeItem(item, index) {
    console.log("Delete clicked - ", item, index);
    const toast = this.toastController.create({
      message: 'Removing Item - ' + item.name + "...",
      duration: 5000
    });
    toast.present();

    this.dataService.removeItem(index);
  }

  editItem(item, index) {
    console.log("Edit clicked - ", item, index);
    this.inputDialogService.showPrompt(item, index);
  }

  //Adding Items to Grocery List
  addItem() {
    console.log("Add clicked");
    this.inputDialogService.showPrompt();
  }
}
