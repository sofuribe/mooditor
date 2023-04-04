from fastapi import APIRouter, Depends, Response, HTTPException
from typing import List, Optional, Union
from queries.goals import (
    Error,
    GoalIn,
    GoalOut,
    GoalRepository,
)
from authenticator import authenticator

router = APIRouter()


@router.post("/goals", response_model=Union[GoalOut, Error])
def create_goal(
    goal: GoalIn,
    response: Response,
    repo: GoalRepository = Depends(),
    account_data: dict = Depends(
        authenticator.get_current_account_data
    ),
):
    if account_data is not None:
        try:
            goal.user_id = account_data["id"]
            return repo.create(goal)
        except Exception:
            raise HTTPException(status_code=400,
                                detail="Create goal did not work")


@router.get("/goals", response_model=Union[List[GoalOut], Error])
def get_all_goals(
    repo: GoalRepository = Depends(),
    account_data: dict = Depends(
        authenticator.get_current_account_data)
):
    if account_data is not None:
        return repo.get_all()
    else:
        raise HTTPException(status_code=401, detail="Invalid Token")
