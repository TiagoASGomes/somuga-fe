import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CrewService } from '../../services/movie/crew/crew.service';
import { AuthService } from '@auth0/auth0-angular';
import { CreateCrew } from '../../../types';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-add-movie-crew',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
  templateUrl: './add-movie-crew.component.html',
  styleUrl: './add-movie-crew.component.scss',
})
export class AddMovieCrewComponent {
  @Input({ required: true }) display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private crewService: CrewService,
    private auth: AuthService
  ) {}

  crewForm = this.formBuilder.group({
    fullName: [''],
  });

  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }

  onConfirm() {
    const { fullName } = this.crewForm.value;

    const crew: CreateCrew = {
      fullName: fullName || '',
    };

    this.auth.getAccessTokenSilently().subscribe((token) => {
      this.crewService.createCrew(crew, token).subscribe(() => {
        this.display = false;
        this.displayChange.emit(this.display);
      });
    });
  }
}
