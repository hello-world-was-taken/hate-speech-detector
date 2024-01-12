"""
Repository module for managing chats in the database.

This module provides an interface for CRUD operations related to the Chat model.
The ChatRepository class interacts directly with the database, handling operations like:
- Creating a chat record
- Retrieving all chats
- Processing chats
"""

from model.chat import Chat  # pylint: disable=import-error


class ChatRepository:
    """
    Repository for managing CRUD operations on Chat records in the database.
    """
    def __init__(self, db_connection):
        """
        Initialize the repository with a database connection.
        """
        self.db_connection = db_connection
        self.cursor = self.db_connection.cursor()
        self.cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS chats (
                id INT AUTO_INCREMENT PRIMARY KEY,
                text TEXT,
                is_hate_speech BOOLEAN
            );
        """
        )
        self.db_connection.commit()

    def create_chat(self, text):
        # todo: first process it
        is_hate_speech = self.process_chat(text)
        """
        Create a new chat record in the database.
        """
        self.cursor.execute(
            "INSERT INTO chats (text, is_hate_speech) VALUES (?, ?)", (text, is_hate_speech)
        )
        self.db_connection.commit()
        chat_id = self.cursor.lastrowid
        return Chat(id=chat_id, text=text, is_hate_speech=is_hate_speech)

    def get_all_chats(self):
        """
        Retrieve all chats.
        """
        self.cursor.execute("SELECT id, text, is_hate_speech FROM chats")
        chats = [
            Chat(id=row[0], text=row[1], is_hate_speech=row[2])
            for row in self.cursor.fetchall()
        ]
        self.db_connection.commit()

        return chats

    # TODO: Should be implemented
    def process_chat(self, text):
        return True
