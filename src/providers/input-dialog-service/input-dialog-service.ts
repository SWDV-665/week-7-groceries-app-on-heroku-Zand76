import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';

/*
  Generated class for the InputDialogServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InputDialogServiceProvider {

  constructor(public alertController: AlertController, public toastController: ToastController, public dataService: GroceriesServiceProvider) {
    console.log('Hello InputDialogServiceProvider Provider');
  }

  //Edit items via alert form
  showPrompt(item?, index?) {
    const prompt = this.alertController.create({
      title: item ? "Edit Item" : 'Add Item',
      message: item ? "Please edit item..." : "Please add item.",
      inputs: [
        {
          name: 'name',
          placeholder: 'name',
          value: item ? item.name : null
        },
        {
          name: 'quantity',
          placeholder: 'quantity',
          value: item ? item.quantity : null
        },
      ],
      buttons: [
        {
          text: 'save',
          handler: item => {
            console.log('Save clicked - ', item.name);
            if (index !== undefined ) {
              this.dataService.editItem(item, index);
            }
            else {
              this.dataService.addItem(item);
            }
            const toast = this.toastController.create({
              message: 'Editing Item - ' + item.name + "...",
              duration: 5000
            });
            toast.present();
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
