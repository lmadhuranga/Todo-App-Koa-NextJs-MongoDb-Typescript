import sys
from typing import List
from langchain_community.vectorstores import FAISS, Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings


def get_embeddings():
    return GoogleGenerativeAIEmbeddings(model="models/embedding-001")


def create_vector_db(texts: List[str]):
    embeddings = get_embeddings()
    if sys.platform == "darwin":
        return Chroma.from_texts(texts, embeddings)
    else:
        return FAISS.from_texts(texts, embeddings)


# Default docs from the notebook
DEFAULT_DOCS = [
    "Delivery delays are usually resolved within 48 hours.",
    "Refund requests are processed within 5 business days.",
    "Escalate negative sentiment cases to senior support.",
]


class RAGService:
    def __init__(self, docs: List[str] = DEFAULT_DOCS):
        self.vector_db = create_vector_db(docs)

    def search(self, query: str, k: int = 2) -> List[str]:
        results = self.vector_db.similarity_search(query, k=k)
        return [r.page_content for r in results]
