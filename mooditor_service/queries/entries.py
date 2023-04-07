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

class EntryOut(BaseModel): # GET METHOD
    id: int
    user_id: int
    activity_name: List[str]
    mood: MoodEnum
    journal: Optional[str]
    created: datetime.date

class EntryGet(BaseModel): # POST METHOD
    id: int
    user_id: int
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
    def create(self, entries: EntryIn, account_data:dict) -> Union[EntryGet, Error]:
        try:
            with pool.connection() as conn:
                db = conn.cursor()
                db.execute(
                    """
                    INSERT INTO entries
                        (user_id, mood, journal, created)
                    VALUES
                        (%s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        account_data["id"],
                        entries.mood,
                        entries.journal,
                        entries.created,
                    ]
                )
                entry_id = db.fetchone()[0]
                activities = []
                for activity in entries.activity_name:
                    result = db.execute(
                        """
                        INSERT INTO activities
                            (entry_id, name)
                        VALUES
                            (%s, %s)
                        RETURNING id;
                        """,
                        [
                            entry_id,
                            activity,
                        ]
                    )
                    activity_id = result.fetchone()[0]
                    activities.append(ActivityOut(
                        id = activity_id,
                        entry_id = entry_id,
                        name = activity,
                    ))
                db.close()
                return EntryGet(
                    id = entry_id,
                    user_id = account_data["id"],
                    mood = entries.mood,
                    journal = entries.journal,
                    created = entries.created,
                    activities = activities
                )
        except Exception as e:
            return {"message": "Could not create an entry: " + e}

    def get_entries(self, account_data: dict) -> Union[Error, List[EntryOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        select *
                        from entries
                        where entries.user_id = %s
                        """,
                        [account_data["id"]]
                    )
                    entries = db.fetchall()
                    entries_return = []
                    for entry in entries:
                        db.execute(
                            """
                                select activities.name
                                from activities
                                where entry_id = %s
                            """,
                            [entry[0]]
                        )
                        activities = [activity[0] for activity in db.fetchall()]
                        entry_with_activities = self.record_to_entries_out(entry, activities)
                        entries_return.append(entry_with_activities)
                    return entries_return
        except Exception as e:
            return {"message": "Could not get the entries" + e}

    def record_to_entries_out(self, entry, activities):
        return EntryOut(
            id = entry[0],
            user_id = entry[1],
            activity_name = activities,
            mood = entry[2],
            journal = entry[3],
            created = entry[4],
        )

    def get_one(self, id: int) -> Optional[EntryOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT entries.id,
                            entries.user_id,
                            entries.activity_name,
                            entries.mood,
                            entries.journal,
                            entries.created
                        FROM entries
                        INNER JOIN users
                        ON entries.user_id = users.id
                        WHERE entries.id = %s
                        """,
                        [id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return EntryOut(
                        id=record[0],
                        user_id=record[1],
                        activity_name=record[2],
                        mood=record[3],
                        journal=record[4],
                        created=record[5],
                    )
        except Exception as e:
            return {"message": "Could not get that entry"}
