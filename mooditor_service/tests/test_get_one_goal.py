from fastapi.testclient import TestClient
from main import app
from queries.goals import GoalRepository
from authenticator import authenticator

client = TestClient(app)


class EmptyGoalQueries:
    def get_all(self):
        return []


class GetGoalQueries:
    def create(self, goal):
        result = {
            "id": 0,
            "user_id": 0,
            "goal": "string",
            "created_on": "2023-04-08",
            "is_completed": False
        }
        result.update(goal)
        return result


test_user = {
    "id": 0,
    "username": "string",
    "email": "string"
}


def user_override():
    return test_user


def test_get_goal():
    app.dependency_overrides[GoalRepository] = GetGoalQueries
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = user_override

    json = {
            "id": 0,
            "user_id": 0,
            "goal": "string",
            "created_on": "2023-04-08",
            "is_completed": False
        }

    expected = {
            "id": 0,
            "user_id": 0,
            "goal": "string",
            "created_on": "2023-04-08",
            "is_completed": False
        }

    response = client.post("/goals", json=json)

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == expected


