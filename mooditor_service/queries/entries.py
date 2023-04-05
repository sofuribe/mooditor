from pydantic import BaseModel
from queries.users import UsersOut
from typing import Optional, Union, List
from enum import Enum
import datetime
from queries.pool import pool

class ActivityEnum(str, Enum):
    Walking = 'Walking'
    Gym = 'Gym'
    Running = 'Running'
    Video_games = 'Video Games'
    Snowboarding = 'Snowboarding'
    Biking = 'Biking'
    Reading = 'Reading'
    Sports = 'Sports'
    Swimming = 'Swimming'
    Hiking = 'Hiking'
    Meditate = 'Meditate'
    Yoga = 'Yoga'
    Skiing = 'Skiing'
    Cooking = 'Cooking'
    Sleeping = 'Sleeping'

class Error(BaseModel):
    message: str

class MoodEnum(str, Enum):
    Awful = 'awful'
    Okay = 'okay'
    Good = 'good'
    Great = "great"

class EntryIn(BaseModel):
    activity_name: List[ActivityEnum]
    mood: MoodEnum
    journal: Optional[str]
    created: datetime.date

class EntryOut(BaseModel):
    id: int
    user_id: int
    activity_name: List[ActivityEnum]
    mood: MoodEnum
    journal: Optional[str]
    created: datetime.date

class ActivityIn(BaseModel):
    name: ActivityEnum
    entry_id: int

class ActivityOut(BaseModel):
    id: int
    entry_id: int
    name: ActivityEnum

class EntriesRepo:
    def create(self, entries: EntryIn, account_data:dict) -> Union[EntryOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    for activity in entries.activity_name:
                        result = db.execute(
                            """
                            INSERT INTO entries
                                (user_id, activity_name, mood, journal, created)
                            VALUES
                                (%s, %s, %s, %s, %s)
                            RETURNING id;
                            """,
                            [
                                account_data["id"],
                                activity,
                                entries.mood,
                                entries.journal,
                                entries.created,
                            ]
                        )
                    id = result.fetchone()[0]
                    return EntryOut(
                        id = id,
                        user_id = account_data["id"],
                        activity_name = entries.activity_name,
                        mood = entries.mood,
                        journal = entries.journal,
                        created = entries.created,
                    )
        except Exception as e:
            return {"message": "Could not create an entry: " + e}
