from fastapi import (
    Depends,
    Response,
    APIRouter,
    HTTPException
)
from typing import List, Optional, Union
from queries.entries import EntryIn, EntryOut, Error, EntriesRepo
from authenticator import authenticator

router = APIRouter()

@router.post("/entries", response_model = Union[EntryOut, Error])
def create_entries(
    entry: EntryIn,
    response: Response,
    repo: EntriesRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.create(entry, account_data)