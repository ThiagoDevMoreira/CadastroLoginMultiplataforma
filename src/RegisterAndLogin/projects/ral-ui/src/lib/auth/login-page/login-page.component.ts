import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { AuthFacadeService } from 'projects/ral-app/src/public-api';
import { LoginDto } from 'projects/ral-app/src/public-api';

@Component({
  selector: 'ral-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
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

      <ion-button expand="block" (click)="onLogin()">Entrar</ion-button>
      <ion-button expand="block" fill="clear" (click)="goRegister()">Criar conta</ion-button>
    </ion-content>
  `,
})
export class LoginPageComponent {
  model: LoginDto = { email: '', password: '' };

  constructor(
    private auth: AuthFacadeService,
    private router: Router,
    private toast: ToastController
  ) {}

  async onLogin() {
    try {
      await this.auth.login(this.model);
      await this.router.navigateByUrl('/start');
    } catch (e: any) {
      const t = await this.toast.create({ message: e?.message ?? 'Falha no login', duration: 2000 });
      await t.present();
    }
  }

  goRegister() {
    this.router.navigateByUrl('/register');
  }
}
