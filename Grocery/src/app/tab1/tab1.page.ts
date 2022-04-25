import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { GroceriesServiceService } from '../groceries-service.service';
import { InputDialogServiceService } from '../input-dialog-service.service';
// import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
// import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  title = "Grocery List";

  items = [];
  errorMessage: string;

  constructor(
    public toastCtrl: ToastController, 
    public alertCtrl: AlertController,
    public dataService: GroceriesServiceService,
    public inputDialogService: InputDialogServiceService,
    // public socialSharing: SocialSharing,
    ) 
      { dataService.dataChanged$.subscribe((dataChanged: boolean) => {
        this.loadItems();
        });
      }

  ionViewDidLoad() {
    this.loadItems();
  }
  
  loadItems() {
    this.dataService.getItems()
      .subscribe(
        items => this.items = items,
        error => this.errorMessage = <any>error);
  }

  async removeItem(item, index) {
    console.log("Removing Item - ", item, index);
    const toast = await this.toastCtrl.create({
      message: "Removing Item - " + index + " ...",
      duration: 3000
    });
    await toast.present();
    this.dataService.removeItem(item, index);
  }

  async shareItem(item) {
    console.log("Sharing Item - ", item);
    const toast = await this.toastCtrl.create({
      message: "Sharing Item - " + item.name + " ...",
      duration: 3000
    });
    await toast.present();

    // let message = "Grocery Item - Name: " + item.name + " - Quantity: " + item.quantity;
    // let subject = "Shared via Groceries app";
    
    //  this.socialSharing.share(message, subject).then(() => {
    //     //Sharing via email is possible
    //   console.log("Shared successfully!");
    // }).catch((error) => {
    //   console.log("Error while sharing ", error);
    // });
  }

  async editItem(item, index) {
    console.log("Edit Item - ", item, index);
    const toast = await this.toastCtrl.create({
      message: "Editing Item - " + index + " ...",
      duration: 3000
    });
    await toast.present();
    this.inputDialogService.showPrompt(item, index);
  }

  async addItem() {
    console.log("Adding new Item");
    const toast = await this.toastCtrl.create({
      message: "Adding new Item",
      duration: 3000
    });
    await toast.present();
    this.inputDialogService.showPrompt();
  }
}
