import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { AlertController, Backdrop } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';

/*
  Generated class for the InputDialogServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class InputDialogServiceProvider {

  selected_option: string;
  constructor(public alertController: AlertController, public toastController: ToastController, public dataService: GroceriesServiceProvider) {
    console.log('Hello InputDialogServiceProvider Provider');
  }

  //Edit items via alert form
  showPrompt(item?, index?) {
    const prompt = this.alertController.create({
      //cssClass: 'my-custom-class',
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
          type: 'number',
          min: 1,
          max: 100,
          placeholder: 'quantity',
          value: item ? item.quantity : null
        },
      ],
      // inputs: [
      //   {
      //     name: 'quantity-1',
      //     type: 'checkbox',
      //     label: 'Checkbox 1',
      //     value: 'value 1',
      //     checked: true
      //   },
      //   {
      //     name: 'quantity-2',
      //     type: 'checkbox',
      //     label: 'Checkbox 2',
      //     value: 'value 2',
      //     checked: false
      //   },
      // ],
      buttons: [
        {
          text: 'save',
          handler: item => {
            console.log('Save clicked - ', item.name);
            if (index !== undefined) {
              this.dataService.editItem(item, index);
              const toast = this.toastController.create({
                message: 'Editing Item - ' + item.name + "...",
                duration: 5000
              });
              toast.present();
            }
            else {
              this.dataService.addItem(item);
              const toast = this.toastController.create({
                message: 'Adding Item - ' + item.name + "...",
                duration: 5000
              });
              toast.present();
            }
          },
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
      ],
      // backdrop-dismiss: false,
    });
    prompt.present();
  }

}
