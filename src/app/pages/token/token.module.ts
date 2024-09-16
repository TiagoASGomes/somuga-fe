import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TokenRoutingModule } from './token-routing.module';
import { TokenComponent } from './token.component';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [TokenComponent],
  imports: [CommonModule, TokenRoutingModule, ButtonModule, ToastModule],
  providers: [MessageService],
})
export class TokenModule {}
