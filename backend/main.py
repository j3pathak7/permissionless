from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import openai

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

# Set up OpenAI API
openai.api_key = "sk-proj-UbnHMreyXUIBmhiLxqbiT3BlbkFJsYreB3VRFRo5JpSw6dl5"


@app.post("/chat")
async def chat(message: str = Form(...)):
    # Use OpenAI's chat functionality
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=message,
        max_tokens=1024,
        n=1,
        stop=None,
        temperature=0.5,
    )

    # Extract the generated text from the response
    generated_text = response.choices[0].text.strip()

    return {"response": generated_text}


@app.get("/")
def read_root():
    return {"Hello": "World"}
