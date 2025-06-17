from fastapi import FastAPI
from contextlib import asynccontextmanager

from Routers.loan_predict import router as predict_router
from database.config import connect_db, disconnect_db  

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_db()
    yield
    await disconnect_db()

app = FastAPI(lifespan=lifespan)

app.include_router(predict_router)
