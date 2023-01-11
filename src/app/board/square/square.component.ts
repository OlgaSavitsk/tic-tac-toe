import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ChatService } from '@core/services/chat.service';
import { GameService } from '@core/services/game.service';

export interface Square {
  id: number;
  state: string;
}

@Component({
  selector: 'app-square',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss'],
})
export class SquareComponent {
  @Input() square: any;
  constructor(public gameService: GameService, private chatService: ChatService) {}

  changePlayer() {
    this.gameService.isGameRunning = true;
    if (this.gameService.isGameRunning && this.square.state === null) {
      this.square.state = this.gameService.activePlayer;
      this.gameService.changePlayerTurn(this.square);
      this.chatService.sendMessage(this.square);
    }
  }
}
