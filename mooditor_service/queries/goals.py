from pydantic import BaseModel
from typing import Union, Optional, List
from queries.pool import pool
import datetime


class Error(BaseModel):
    message: str


class GoalIn(BaseModel):
    user_id: Optional[int]
    goal: str
    created_on: Optional[datetime.date]
    is_completed: Optional[bool] = False


class GoalOut(BaseModel):
    id: int
    user_id: int
    goal: str
    created_on: datetime.date
    is_completed: Optional[bool] = False


class GoalRepository:
    def create(self, goal: GoalIn) -> Union[GoalOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    if goal.created_on is None:
                        goal.created_on = datetime.date.today()
                    result = db.execute(
                        """
                        INSERT INTO goals
                            (
                                user_id,
                                goal,
                                created_on,
                                is_completed
                            )
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING id, created_on;
                        """,
                        [
                            goal.user_id,
                            goal.goal,
                            goal.created_on,
                            goal.is_completed,
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.goal_in_to_out(id, goal)
        except Exception:
            return {"message": "Create goal did not work"}

    def get_all(self, account_data: dict) -> Union[Error, List[GoalOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT
                            goals.id,
                            goals.user_id,
                            goals.goal,
                            goals.created_on,
                            goals.is_completed
                        FROM goals
                        JOIN users
                        ON goals.user_id = users.id
                        WHERE users.id = %s AND goals.created_on = %s
                        ORDER BY created_on;
                        """,
                        [account_data["id"], datetime.date.today()],
                    )
                    return [self.record_to_goal_out(record) for record in db]
        except Exception:
            return {"message": "Could not get all goals"}

    def get_one(self, id: int) -> Optional[GoalOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                            goals.id,
                            goals.user_id,
                            goals.goal,
                            goals.created_on,
                            goals.is_completed
                        FROM goals
                        INNER JOIN users
                        ON goals.user_id = users.id
                        WHERE goals.id = %s
                        """,
                        [id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_goal_out(record)
        except Exception:
            return {"message": "Could not get that goal"}

    def update(self, id: int, goal: GoalIn) -> Union[GoalOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    if goal.created_on is None:
                        goal.created_on = datetime.date.today()
                    if goal.user_id is None:
                        db.execute(
                            """
                            SELECT user_id FROM goals WHERE id = %s
                            """,
                            [id],
                        )
                        goal.user_id = db.fetchone()[0]
                    if goal.goal is None:
                        db.execute(
                            """
                            SELECT goal FROM goals WHERE id = %s
                            """,
                            [id],
                        )
                        goal.goal = db.fetchone()[0]

                    db.execute(
                        """
                        UPDATE goals
                        SET goal = %s,
                            created_on = %s,
                            is_completed = %s
                        WHERE id = %s
                        """,
                        [
                            goal.goal,
                            goal.created_on,
                            goal.is_completed,
                            id,
                        ],
                    )
                    return self.goal_in_to_out(id, goal)
        except Exception:
            return {"message": "Could not update that goal"}

    def delete(self, id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM goals
                        WHERE id = %s
                        """,
                        [id],
                    )
                    return True
        except Exception:
            return False

    def goal_in_to_out(self, id: int, goal: GoalIn):
        old_data = goal.dict()
        return GoalOut(id=id, **old_data)

    def record_to_goal_out(self, record):
        return GoalOut(
            id=record[0],
            user_id=record[1],
            goal=record[2],
            created_on=record[3],
            is_completed=record[4],
        )
