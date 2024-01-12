'use client';
import React from "react";
import { InputForm } from "@/components/input-form";
import ChatCard from "@/components/chat-card";
import { useQuery } from "react-query";
import axios from "axios";
import { Chat } from "./model/chat";

export default function Home() {
  // TODO: use hooks if we have time
  const {
    data: chats,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const { data } = await axios.get<Array<Chat>>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/chats`
      );
      console.log(data);
      return data;
    },
  });
  return (
    <div className="py-8 flex space-y-4 flex-col items-center mx-auto w-8/12 h-full">
      <h1 className="text-2xl font-bold mb-4 w-full px-4">Previous chats</h1>
      <div className="flex-grow w-full flex flex-col space-y-4 overflow-y-scroll p-4">
        {!chats && <p>You do not have a chat history.</p>}
        {chats &&
          chats.map((chat, index) => <ChatCard chat={chat} key={index} />)}
        {isError && <p>Something went wrong</p>}
      </div>
      <InputForm />
    </div>
  );
}
