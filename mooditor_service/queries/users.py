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
    def create(
        self, users: UsersIn, hashed_password: str
    ) -> UsersOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO users
                            (username, email, hashed_password)
                        VALUES
                            (%s, %s, %s)
                        RETURNING id;
                        """,
                        [users.username, users.email, hashed_password],
                    )
                    id = result.fetchone()[0]
                    return UsersOutWithPassword(
                        id=id,
                        username=users.username,
                        email=users.email,
                        hashed_password=hashed_password,
                    )
        except Exception:
            return {"message": "Could not create user"}

    def get(self, username: str) -> UsersOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , username
                            , email
                            , hashed_password
                        FROM users
                        WHERE username = %s
                        """,
                        [username],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    user = UsersOutWithPassword(
                        id=record[0],
                        username=record[1],
                        email=record[2],
                        hashed_password=record[3],
                    )
                    return user
        except Exception:
            return {"message": "Could not get user"}
