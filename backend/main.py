from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

app = FastAPI()
# Configure CORS
origins = [
    "http://localhost:3000",
    "https://permissionless-six.vercel.app /"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/chat")
async def chat(message: str = Form(...)):
    response = message.upper()
    return {"response": response}


@app.get("/")
def read_root():
    return {"Hello": "World"}
