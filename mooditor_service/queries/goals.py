from pydantic import BaseModel
from typing import Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class GoalIn(BaseModel):
    user_id: int
    goal: str


class GoalOut(BaseModel):
    id: int
    user_id: int
    goal: str


class GoalRepository:
    def create(self, goal: GoalIn) -> Union[GoalOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO goals
                            (
                                user_id,
                                goal
                            )
                        VALUES
                            (%s, %s)
                        RETURNING id;
                        """,
                        [
                            goal.user_id,
                            goal.goal,
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.goal_in_to_out(id, goal)
        except Exception:
            return {"message": "Create goal did not work1"}

    def goal_in_to_out(self, id: int, goal: GoalIn):
        old_data = goal.dict()
        return GoalOut(id=id, **old_data)

    def record_to_goal_out(self, record):
        return GoalOut(
            id=record[0],
            goal=record[1],
            user_id=record[2],
        )
