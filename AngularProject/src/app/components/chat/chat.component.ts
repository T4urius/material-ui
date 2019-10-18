import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  message: string;
  messages: string[] = [];

  constructor(private chatService: ChatService) {

  }

  ngOnInit() {
    document.getElementById('contentChat').style.visibility = 'hidden';
    document.getElementById('contentChat').style.animation = '';

    this.chatService.getMessages().subscribe((message: string) => {
      this.messages.push(message);
    })
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
