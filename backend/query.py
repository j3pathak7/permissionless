from langchain_openai import ChatOpenAI
import langchain
import openai
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

def generate_response(query: str):
    llm = ChatOpenAI(api_key="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")
    llm.invoke("how can langsmith help with testing?")
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You will answer queries related to various Indian Government policies."),
        ("user", "{input}")
    ])
    output_parser = StrOutputParser()
    chain = prompt | llm | output_parser
    response = chain.invoke({"input": query})
    return response
