from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from langchain_openai import ChatOpenAI
import langchain
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:3000",
    "https://permissionless-two.vercel.app",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set up LangChain
openai_api_key = os.environ.get("OPENAI_API_KEY")
if not openai_api_key:
    raise ValueError(
        "OPENAI_API_KEY environment variable is not set or is empty")

llm = ChatOpenAI(api_key=openai_api_key)
prompt = ChatPromptTemplate.from_messages([
    ("system", "You will answer queries related to various Indian Government policies."),
    ("user", "{input}")
])
output_parser = StrOutputParser()
chain = prompt | llm | output_parser

# Define the generate_response function


def generate_response(query: str):
    response = chain.invoke({"input": query})
    return response


@app.post("/chat")
async def chat(message: str = Form(...)):
    response = generate_response(message)
    return {"response": response}


@app.get("/")
def read_root():
    return {"Hello": "World"}
