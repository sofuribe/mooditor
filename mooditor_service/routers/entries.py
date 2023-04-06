from fastapi import (
    Depends,
    Response,
    APIRouter,
    HTTPException
)
from typing import List, Optional, Union
from queries.entries import EntryIn, EntryOut, EntryGet, Error, EntriesRepo
from authenticator import authenticator

router = APIRouter()

@router.post("/entries", response_model = Union[EntryGet, Error])
def create_entries(
    entry: EntryIn,
    response: Response,
    repo: EntriesRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.create(entry, account_data)

@router.get("/entries", response_model = Union[List[EntryOut], Error])
def get_all_entries(
    repo: EntriesRepo = Depends(),
    account_data: dict = Depends(
        authenticator.get_current_account_data)
):
    if account_data is not None:
        entries = repo.get_entries(account_data)
        return entries
    else:
        print("Could not get all available entries")

@router.get("/entry/{id}", response_model=Union[Error, EntryOut])
def get_one_entry(
    id: int,
    response: Response,
    repo: EntriesRepo = Depends(),
    account_data: dict = Depends(
        authenticator.try_get_current_account_data
    ),
) -> EntryOut:
    entry = repo.get_one(id)
    if account_data is not None and entry is not None:
        return entry
    if entry is None:
        raise HTTPException(status_code=404, detail="Entry not found")
    raise HTTPException(status_code=401, detail="Invalid Token")
