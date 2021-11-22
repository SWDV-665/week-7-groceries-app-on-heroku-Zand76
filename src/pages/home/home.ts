import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';
import { SocialSharing } from '@ionic-native/social-sharing';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Grocery List"


  constructor(public navCtrl: NavController, public toastController: ToastController, public alertController: AlertController, public dataService: GroceriesServiceProvider, public inputDialogService: InputDialogServiceProvider, public socialSharing: SocialSharing) {
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

  //Sharing Items on Grocery List
  shareItem(item, index) {
    console.log("Share clicked - ", item, index);
    const toast = this.toastController.create({
      message: 'Sharing Item - ' + item.name + "...",
      duration: 5000
    });
    toast.present();

    let message = "Grocery Item - Name: " + item.name + " - Quantity: " + item.quantity;
    let subject = "Shared via Groceries app";

    // Check if sharing via email is supported
    this.socialSharing.share(message, subject).then(() => {
      console.log("Shared successfully!");
      
    // Sharing via email is possible
    }).catch((error) => {
      console.error("Error while sharing.", error);
    });
  }

  //Editing Items on Grocery List
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
