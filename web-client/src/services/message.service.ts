import {IPrimeMessage} from "interfaces";
import {setRecoil} from "recoil-nexus";
import {messageState} from "recoil/atoms";

export class MessageService {

  private static _instance: MessageService;
  private messages: IPrimeMessage[] = [];

  public static get Instance(): MessageService {
    if (!MessageService._instance) {
      MessageService._instance = new MessageService();
    }
    return MessageService._instance;
  }

  addMessage(message: IPrimeMessage) {
    this.messages = [...this.messages, message];
    setRecoil(messageState, this.messages);
  }

}