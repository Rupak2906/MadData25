from fastapi import FastAPI
import pandas as pd
import math
from operation import get_json_data
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()


origins = [
    "http://localhost:5173",  # React's development server
    # Add other origins if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,         # Allowed origins
    allow_credentials=True,
    allow_methods=["*"],           # Allowed HTTP methods
    allow_headers=["*"],           # Allowed HTTP headers
)

# Sample root endpoint
@app.get("/center")
def read_c():
    return get_json_data("NBA_C.csv")

@app.get("/power-forward")
def read_pf():
    return get_json_data("NBA_PF.csv")

@app.get("/point-guard")
def read_pg():
    return get_json_data("NBA_PG.csv")

@app.get("/small-forward")
def read_sf():
    return get_json_data("NBA_SF.csv")

@app.get("/shooting-guard")
def read_sg():
    return get_json_data("NBA_SG.csv")
