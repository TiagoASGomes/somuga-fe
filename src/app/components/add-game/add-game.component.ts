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
import { CreateGame, DropdownOption } from '../../../types';
import { GameService } from '../../services/game/game.service';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { AuthService } from '@auth0/auth0-angular';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-add-game',
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
  ],
  templateUrl: './add-game.component.html',
  styleUrl: './add-game.component.scss',
})
export class AddGameComponent {
  @Input({ required: true }) display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();
  @Input({ required: true }) developers: DropdownOption[] = [];
  @Input({ required: true }) genres: DropdownOption[] = [];
  @Input({ required: true }) platforms: DropdownOption[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private gameService: GameService,
    private auth: AuthService
  ) {}

  gameForm = this.formBuilder.group({
    title: [''],
    releaseDate: [''],
    developerId: new FormControl<DropdownOption | null>({ name: '', id: 0 }),
    genreIds: new FormControl<DropdownOption[] | null>([]),
    platformsIds: new FormControl<DropdownOption[] | null>([]),
    description: [''],
    mediaUrl: [''],
    imageUrl: [''],
  });

  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }

  onConfirm() {
    const {
      title,
      releaseDate,
      developerId,
      genreIds,
      platformsIds,
      description,
      mediaUrl,
      imageUrl,
    } = this.gameForm.value;

    const game: CreateGame = {
      title: title || '',
      releaseDate: releaseDate || '',
      developerId: developerId?.id || 0,
      genreIds: genreIds?.map((g: DropdownOption) => g.id) || [],
      platformsIds: platformsIds?.map((p: DropdownOption) => p.id) || [],
      description: description || '',
      mediaUrl: mediaUrl || '',
      imageUrl: imageUrl || '',
    };

    // TODO: Add toasts

    this.auth.getAccessTokenSilently().subscribe((token) => {
      this.gameService.createGame(game, token).subscribe((res) => {
        this.display = false;
        this.displayChange.emit(this.display);
      });
    });
  }
}
