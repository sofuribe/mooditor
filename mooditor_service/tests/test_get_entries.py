from fastapi.testclient import TestClient
from main import app
from queries.entries import EntriesRepo
from authenticator import authenticator

client = TestClient(app)


class EmptyEntryQueries:
    def get_entries(self, id):
        return []


test_user = {"id": 1, "username": "string", "email": "string"}


def user_override():
    return test_user


def test_get_all_entries():
    app.dependency_overrides[EntriesRepo] = EmptyEntryQueries
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = user_override

    response = client.get("/entries")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == []
