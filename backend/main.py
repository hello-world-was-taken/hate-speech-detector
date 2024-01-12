"""
FastAPI application for identifying Hate Speech.

This module provides CRUD operations for chats using FastAPI and a SQL database.
Endpoints support operations like creating, reading chat records.
"""

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from model.chat import Chat
from repository.chat_repository import ChatRepository
from db_util import get_db

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

APP_HOST = os.environ.get("APP_HOST")
DATABASE_CONNECTION = get_db()
repository = ChatRepository(DATABASE_CONNECTION)


@app.get("/chats", response_model=list[Chat])
async def get_all_chats():
    """
    Retrieve all chat entries from the database.
    """
    return repository.get_all_chats()


@app.post("/chats", response_model=Chat)
async def create_chat(obj: dict):
    """
    Create a new chat entry in the database.
    """
    text = obj["text"]
    print()
    print()
    print(str(obj))
    print()
    print()
    return repository.create_chat(text)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host=APP_HOST, port=8000)
