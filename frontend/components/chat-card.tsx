import { Chat } from "@/app/model/chat";
import React from "react";

type ChatCardProps = {
  chat: Chat;
};

const ChatCard: React.FC<ChatCardProps> = ({ chat }) => {
  return (
    <div
      className={`${
        chat.is_hate_speech == 1 ? "bg-red-200" : ""
      } px-4 border rounded ${
        chat.is_hate_speech == 1 ? "border-red-500" : "border-slate"
      } block w-full rounded-lg  text-left`}
    >
      <div className="p-6">
        <p className="text-base">{chat.text}</p>
      </div>
    </div>
  );
};

export default ChatCard;
