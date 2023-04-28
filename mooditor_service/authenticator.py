import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.users import UsersRepo, UsersOut, UsersOutWithPassword


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        email: str,
        accounts: UsersRepo,
    ):
        return accounts.get(email)

    def get_account_getter(
        self,
        accounts: UsersRepo = Depends(),
    ):
        return accounts

    def get_hashed_password(self, account: UsersOutWithPassword):
        return account.hashed_password

    def get_account_data_for_cookie(self, account: UsersOut):
        return account.username, UsersOut(**account.dict())


authenticator = MyAuthenticator(os.environ.get("SIGNING_KEY"))
