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





# from fastapi.testclient import TestClient
# from main import app
# from queries.goals import GoalRepository, GoalOut
# from authenticator import authenticator

# client = TestClient(app)


# class EmptyGetGoalQueries:
#     def get_one(self):
#         return []


# class GoalRepoMock(GoalRepository):
#     def get_one(self, id: int) -> GoalOut:
#         if id == 0:
#             return GoalOut(
#                 id=0,
#                 user_id=0,
#                 goal="string",
#                 created_on="2023-04-08",
#                 is_completed=False,
#             )
#         else:
#             return None


# test_user = {
#   "id": 0,
#   "username": "string",
#   "email": "string"
# }


# def account_override():
#     return test_user


# def test_get_one_goal():
#     app.dependency_overrides[GoalRepository] = GoalRepoMock
#     app.dependency_overrides[
#         authenticator.try_get_current_account_data
#         ] = account_override

#     response = client.get("/goal/{id}")
#     data = response.json()
#     if response.status_code == 404:
#         assert data["detail"] == "Goal not found"
#     else:
#         assert response.status_code == 200
#         assert data == {
#             "id": 1,
#             "user_id": 1,
#             "goal": "string",
#             "created_on": "2023-04-08",
#             "is_completed": False
#         }

#     app.dependency_overrides = {}
