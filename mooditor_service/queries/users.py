from pydantic import BaseModel
from queries.pool import pool


class DuplicateUsersError(ValueError):
    pass


class UsersIn(BaseModel):
    username: str
    password: str
    email: str


class UsersOut(BaseModel):
    id: int
    username: str
    email: str

class UsersOutWithPassword(UsersOut):
    hashed_password: str


class UsersRepo:
    def create (self, users: UsersIn, hashed_password: str) -> UsersOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO users
                            (username, password, email, hashed_password)
                        VALUES
                            (%s, %s, %s, %s);
                        RETURNING id;
                        """,
                        [
                            users.username,
                            users.email,
                            hashed_password
                        ]
                    )
                    id = result.fetchone()[0]
                    old_data = users.dict()
                    return UsersOutWithPassword(
                        id=id,
                        **old_data,
                        hashed_password=hashed_password
                    )
        except Exception as e:
            return {"message": "Cannot create user"}
