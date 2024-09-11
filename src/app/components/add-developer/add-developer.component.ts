import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DeveloperService } from '../../services/game/developer/developer.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CreateDeveloper } from '../../../types';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-add-developer',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
  templateUrl: './add-developer.component.html',
  styleUrl: './add-developer.component.scss',
})
export class AddDeveloperComponent {
  @Input({ required: true }) display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private developerService: DeveloperService,
    private auth: AuthService
  ) {}

  developerForm = this.formBuilder.group({
    developerName: [''],
  });

  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }

  onConfirm() {
    const { developerName } = this.developerForm.value;

    const developer: CreateDeveloper = {
      developerName: developerName || '',
    };

    this.auth.getAccessTokenSilently().subscribe((token) => {
      this.developerService.createDeveloper(developer, token).subscribe(() => {
        this.display = false;
        this.displayChange.emit(this.display);
      });
    });
  }
}
