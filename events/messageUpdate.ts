import { Events, Message } from "discord.js";
import GBFClient from "../handler/clienthandler";

export default function messageEdit(client: GBFClient) {
  client.on(
    Events.MessageUpdate,
    async (oldMessage: Message, newMessage: Message) => {
      const Channel = oldMessage.channel;

      const message = `Old Message: ${oldMessage.content}\n\nNew Message: ${newMessage.content}\n\nAuthor: ${oldMessage.author.username}`;

      Channel.send({
        content: `${message}`
      });
    }
  );
}