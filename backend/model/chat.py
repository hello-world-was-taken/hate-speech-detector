from dataclasses import dataclass


@dataclass
class Chat:
    id: int
    text: str
    is_hate_speech: bool
