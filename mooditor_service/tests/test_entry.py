from fastapi.testclient import TestClient
from main import app
from queries.entries import EntriesRepo
from authenticator import authenticator

client = TestClient(app)

class EmptyEntryQueries:
    def get_all(self):
        return []

class CreateEntryQueries:
    def create(self, entry, account_data):
        result = {
        "id": 1,
        "user_id": account_data["id"],
        "activity_name": [
            "Walking"
        ]
    }
        result.update(entry)
        return result

test_user = {
    "id": 1,
    "username": "string",
    "password": "string"
}

def user_override():
    return test_user

def test_create_entry():
    app.dependency_overrides[EntriesRepo] = CreateEntryQueries
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = user_override

    json = {
        "activity_name": [
            "Walking"
        ],
        "mood": "awful",
        "journal": "string",
        "created": "2023-04-07"
    }

    expected = {
        "id": 1,
        "user_id": 1,
        "mood": "awful",
        "journal": "string",
        "created": "2023-04-07"
    }

    response = client.post("/entries", json=json)

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == expected
