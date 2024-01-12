"""
Module for establishing a connection to the database.

This module provides utility functions to extract database configurations from
environment variables and establish a connection to the database.
"""

import sqlite3


def get_db():
    connection = sqlite3.connect("chats.db")
    return connection
