import { NgModule } from '@angular/core';
import { IonAlert, IonButton } from '@ionic/angular/standalone';
import { IonRippleEffect } from '@ionic/angular/standalone';
import { IonCheckbox } from '@ionic/angular/standalone';
import { IonDatetime } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonModal } from '@ionic/angular/standalone';
import {
  IonBadge,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/angular/standalone';
import { CurrencyPipe } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/angular/standalone';

@NgModule({
  declarations: [],
  imports: [
    IonButton,
    IonAlert,
    IonRippleEffect,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCheckbox,
    IonDatetime,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonList,
    CurrencyPipe,
    IonBadge,
    IonFab,
    IonFabButton,
    IonIcon,
    CommonModule,
    IonModal,
  ],
  exports: [
    IonButton,
    IonAlert,
    IonRippleEffect,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCheckbox,
    IonDatetime,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonList,
    CurrencyPipe,
    IonBadge,
    IonFab,
    IonFabButton,
    IonIcon,
    CommonModule,
    IonModal,
  ],
  providers: [],
})
export class SharedModule {}
