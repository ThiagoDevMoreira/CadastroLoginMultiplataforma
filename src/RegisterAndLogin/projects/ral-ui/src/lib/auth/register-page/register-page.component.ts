import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';

import { AuthFacadeService, RegisterDto } from 'projects/ral-app/src/public-api';

@Component({
  selector: 'ral-register-page',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Cadastro</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-item>
        <ion-label position="stacked">E-mail</ion-label>
        <ion-input [(ngModel)]="model.email" type="email"></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="stacked">Senha</ion-label>
        <ion-input [(ngModel)]="model.password" type="password"></ion-input>
      </ion-item>

      <ion-button expand="block" (click)="onRegister()">Cadastrar</ion-button>
      <ion-button expand="block" fill="clear" (click)="goLogin()">Voltar</ion-button>
    </ion-content>
  `,
})
export class RegisterPageComponent {
  model: RegisterDto = { email: '', password: '' };

  constructor(
    private auth: AuthFacadeService,
    private router: Router,
    private toast: ToastController
  ) {}

  async onRegister() {
    try {
      await this.auth.register(this.model);
      const t = await this.toast.create({ message: 'Cadastrado! Faça login.', duration: 1500 });
      await t.present();
      await this.router.navigateByUrl('/login');
    } catch (e: any) {
      const t = await this.toast.create({ message: e?.message ?? 'Falha no cadastro', duration: 2000 });
      await t.present();
    }
  }

  goLogin() {
    this.router.navigateByUrl('/login');
  }
}
