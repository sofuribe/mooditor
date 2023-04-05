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
        goals = repo.get_all(account_data)

        return goals
    else:
        raise HTTPException(status_code=401, detail="Invalid Token")


@router.get("/goal/{id}", response_model=Union[Error, GoalOut])
def get_one_goal(
    id: int,
    response: Response,
    repo: GoalRepository = Depends(),
    account_data: dict = Depends(
        authenticator.try_get_current_account_data
    ),
) -> GoalOut:
    goal = repo.get_one(id)
    if account_data is not None and goal is not None:
        return goal
    if goal is None:
        raise HTTPException(status_code=404, detail="Goal not found")
    raise HTTPException(status_code=401, detail="Invalid Token")


@router.put("/goal/{id}", response_model=Union[GoalOut, Error])
def update_goal(
    id: int,
    goal: GoalIn,
    response: Response,
    repo: GoalRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[GoalOut, Error]:
    existing_goal = repo.get_one(id)
    if existing_goal is None:
        raise HTTPException(status_code=404, detail="Goal not found")
    if existing_goal is not None:
        return repo.update(id, goal)
    else:
        raise HTTPException(status_code=401, detail="Unauthorized to update goal")
