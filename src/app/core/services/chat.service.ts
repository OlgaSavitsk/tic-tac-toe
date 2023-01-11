import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Square } from 'src/app/board/square/square.component';
import { MessageInfo } from 'src/app/models/message.interfaces';
import { GameService } from './game.service';
import { LocalStorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  joined: boolean = false;
  socket: Socket;
  messagesResponse: MessageInfo[] = [];
  currentName!: string | null;
  secondPlayer!: string;

  constructor(private storageService: LocalStorageService, private gameService: GameService) {
    this.socket = io('https://tic-tac-toe-server-production-7d91.up.railway.app');
    this.currentName = this.storageService.loadFromLocalStorage('userName');
    this.getMessage();
  }

  getMessage(): void {
    this.socket.emit('findAllMessages', {}, (response: any) => {
      this.messagesResponse = response;
    });
    this.socket.on('message', (response: any) => {
      this.messagesResponse = response;
      if (response.name) {
        this.secondPlayer = response.name;
      } else {     
        this.gameService.updateBoard(response);
        if(!this.gameService.isGameOver) this.gameService.activePlayer = response.state === 'X' ? 'O' : 'X'
       
      }
      
      // if (response.recipient === this.currentName) {
      //   this.renderReceivedMessage(response.recipient);
      // } else {
      //   this.renderSentMessage(response.recipient, this.currentName!);
      // }
    });
  }

  sendMessage(square: Square): void {
    this.socket.emit('createMessage', { state: square.state, id: square.id }, () => {});
  }

  renderSentMessage(select: string, current: string): void {
    // this.messages = this.messagesResponse.filter(
    //   (message: MessageInfo) => message.recipient === select && message.name === current
    // );
    // this.status = false;
  }

  renderReceivedMessage(currentUser: string): void {
    // this.messages = this.messagesResponse.filter(
    //   (message: MessageInfo) => message.recipient === currentUser
    // );
    // this.status = true;
  }

  join(name: string): void {
    this.socket.emit('join', name, (response: any) => {
      console.log(response);
      response &&
        (this.secondPlayer = response.filter((playerName: string) => playerName !== name)[0]);
      this.joined = true;
    });
  }
}
