from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from langchain_anthropic import ChatAnthropic
import langchain
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
import os
from dotenv import load_dotenv

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
claude_api_key = os.getenv("CLAUDE_API_KEY")
if not claude_api_key:
    raise ValueError(
        "CLAUDE_API_KEY environment variable is not set or is empty")
# Add model_name parameter
llm = ChatAnthropic(api_key=claude_api_key,
                    model_name="claude-3-opus-20240229")

prompt = ChatPromptTemplate.from_messages([
    ("system", "You will answer queries related to various Indian Government policies. Give short responses. Make your answers very short."),
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


@app.get("/start")
async def start():
    return {"response": "Hello! How may I assist you with queries about Indian government policies today?"}
