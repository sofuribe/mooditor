import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.users import UsersRepo, UsersOut, UsersOutWithPassword


class MyAuthenticator(Authenticator):
    async def get_users_data(
        self,
        username: str,
        users: UsersRepo,
    ):
        # Use your repo to get the account based on the
        # username (which could be an email)
        return users.get(username)

    def get_users_getter(
        self,
        users: UsersRepo = Depends(),
    ):
        # Return the users. That's it.
        return users

    def get_hashed_password(self, users: UsersOutWithPassword):
        # Return the encrypted password value from your
        # users object
        return users.hashed_password

    def get_users_data_for_cookie(self, users: UsersOut):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        return users.username, UsersOut(**users.dict())


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
