import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CreateMovie, CreateRoles, DropdownOption } from '../../../types';
import { MovieService } from '../../services/movie/movie.service';
import { AuthService } from '@auth0/auth0-angular';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormatRolePipe } from '../../pipes/format-role.pipe';

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    DropdownModule,
    MultiSelectModule,
    InputTextModule,
    InputTextareaModule,
    FormatRolePipe,
  ],
  templateUrl: './add-movie.component.html',
  styleUrl: './add-movie.component.scss',
})
export class AddMovieComponent {
  @Input({ required: true }) display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();
  @Input({ required: true }) crew: DropdownOption[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private movieService: MovieService,
    private auth: AuthService
  ) {}

  displayAddCast: boolean = false;
  showCharacterName: boolean = false;
  cast: CreateRoles[] = [];
  roles = [
    { label: 'Director', value: 'DIRECTOR' },
    { label: 'Actor', value: 'ACTOR' },
    { label: 'Writer', value: 'WRITER' },
  ];

  movieForm = this.formBuilder.group({
    title: [''],
    releaseDate: [''],
    duration: [0],
    crew: this.formBuilder.array([]),
    description: [''],
    mediaUrl: [''],
    imageUrl: [''],
  });

  castForm = this.formBuilder.group({
    movieCrewId: new FormControl<DropdownOption | null>({ name: '', id: 0 }),
    movieRole: [''],
    characterName: [''],
  });

  showAddCast() {
    this.displayAddCast = true;
  }

  removeCast(member: CreateRoles) {
    this.cast = this.cast.filter((c) => c !== member);
  }

  onCancelCast() {
    this.displayAddCast = false;
  }

  onConfirmCast() {
    const { movieCrewId, movieRole, characterName } = this.castForm.value;

    const cast: CreateRoles = {
      movieCrewId: movieCrewId?.id || 0,
      movieCrewName: movieCrewId?.name || '',
      movieRole: movieRole || '',
      characterName: characterName || '',
    };

    this.cast.push(cast);
    this.displayAddCast = false;
  }

  onRoleChange(event: any) {
    const role = event.value;
    if (role === 'ACTOR') {
      this.showCharacterName = true;
    } else {
      this.showCharacterName = false;
    }
  }

  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }

  onConfirm() {}
}
