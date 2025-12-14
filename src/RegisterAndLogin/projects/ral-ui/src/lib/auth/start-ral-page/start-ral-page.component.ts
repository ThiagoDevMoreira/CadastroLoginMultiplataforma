import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthFacadeService } from 'projects/ral-app/src/public-api';

@Component({
  selector: 'ral-start-page',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Start Page</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ng-container *ngIf="(auth.session$ | async) as session; else loggedOut">
        <p>Logado como: <b>{{ session.user.email }}</b></p>
        <ion-button expand="block" color="danger" (click)="logout()">Sair</ion-button>
      </ng-container>

      <ng-template #loggedOut>
        <p>Você não está logado.</p>
        <ion-button expand="block" (click)="goLogin()">Ir para Login</ion-button>
      </ng-template>
    </ion-content>
  `,
})
export class StartRalPageComponent {
  constructor(public auth: AuthFacadeService, private router: Router) {}

  async logout() {
    await this.auth.logout();
    await this.router.navigateByUrl('/login');
  }

  goLogin() {
    this.router.navigateByUrl('/login');
  }
}
