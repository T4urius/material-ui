import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../../../chat.service';
import * as moment from 'moment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private chatService: ChatService) {

  }

  message: string;
  messages: string[] = [];

  ngOnInit() {
    this.chatService.getMessages().
      subscribe((message: string) => {
        let currentTime = moment().format('hh:mm:ss a');
        let messageWithTimestamp = `${currentTime}: ${message}`;
        this.messages.push(messageWithTimestamp);
      });

    document.getElementById('contentChat').style.visibility = 'hidden';
    document.getElementById('contentChat').style.animation = '';
  }

  showChat() {
    let contentChat = document.getElementById('contentChat');
    if (contentChat.style.visibility == 'hidden') {
      contentChat.style.visibility = 'visible';
      setTimeout(() => contentChat.style.animation = "openBox  1s linear", 5);
    }
    else {
      contentChat.style.visibility = 'hidden';
      contentChat.style.animation = '';
    }
  }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

}
