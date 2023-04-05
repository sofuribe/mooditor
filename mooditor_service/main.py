from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from authenticator import authenticator
import os
from routers import users, goals, entries

app = FastAPI()
app.include_router(authenticator.router)
app.include_router(users.router)
app.include_router(goals.router)
app.include_router(entries.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
