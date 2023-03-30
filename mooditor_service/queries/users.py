from pydantic import BaseModel


class DuplicateAccountError(ValueError):
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


class UsersRepo():
    pass