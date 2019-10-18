import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../../../chat.service';

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

  showChat() {
    let contentChat = document.getElementById('contentChat');
    if (contentChat.style.visibility == 'hidden') {
      setTimeout(() => contentChat.style.animation = "openBox  1s linear", 5);
      contentChat.style.visibility = 'visible';
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

  ngOnInit() {
    this.chatService.getMessages().
      subscribe((message: string) => {
        this.messages.push(message);
      });

    document.getElementById('contentChat').style.visibility = 'hidden';
    document.getElementById('contentChat').style.animation = '';
  }

}
