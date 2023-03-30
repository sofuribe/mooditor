from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator

from pydantic import BaseModel

from queries.users import (
    UsersIn,
    UsersOut,
    UsersRepo,
    DuplicateUsersError,
)

class UsersForm(BaseModel):
    username: str
    password: str
    email: str

class UsersToken(Token):
    users: UsersOut

class HttpError(BaseModel):
    detail: str

router = APIRouter()


@router.post("/api/users", response_model=UsersToken | HttpError)
async def create_users(
    info: UsersIn,
    request: Request,
    response: Response,
    repo: UsersRepo = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        users = repo.create(info, hashed_password)
    except DuplicateUsersError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = UsersForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return UsersToken(users=users, **token.dict())