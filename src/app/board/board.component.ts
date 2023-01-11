import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '@core/services/chat.service';
import { GameService } from '@core/services/game.service';
import { LocalStorageService } from '@core/services/localstorage.service';
import { MaterialModule } from '../material/material.module';
import { SquareComponent } from './square/square.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, MaterialModule, SquareComponent],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  formGroup!: FormGroup;
  currentUser!: string;
  user!: string;
  constructor(
    public gameService: GameService,
    public chatService: ChatService,
    private storageService: LocalStorageService
  ) {}
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      login: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    const { login } = this.formGroup.value;
    this.storageService.setStorageData({ name: login }, 'userName');
    this.chatService.join(login);
    this.user = this.currentUser;
  }

  resetGame() {
    this.gameService.newGame();
  }
}
