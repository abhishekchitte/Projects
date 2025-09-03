import os
import pickle
import faiss
from sentence_transformers import SentenceTransformer
from transformers import pipeline

VECTOR_DIR = "vectorstore"

CUSTOM_PROMPT_TEMPLATE = """
Use the pieces of information provided in the context to answer user's question.
If you dont know the answer, just say that you dont know, dont try to make up an answer. 
Dont provide anything out of the given context.

Context: {context}
Question: {question}

Start the answer directly. No small talk please.
"""

class MediMemory:
    def __init__(self):
        # Embedding model for retrieval
        self.embed_model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

        # Load FAISS index
        self.index = faiss.read_index(os.path.join(VECTOR_DIR, "faiss_index.bin"))

        # Load text chunks
        with open(os.path.join(VECTOR_DIR, "chunks.pkl"), "rb") as f:
            self.chunks = pickle.load(f)

        # Load lightweight instruction-tuned model (CPU friendly)
        self.generator = pipeline(
            "text2text-generation",
            model="google/flan-t5-base",
            device=-1
        )

    def retrieve(self, query, k=3):
        """Retrieve top-k most relevant chunks from FAISS index"""
        query_emb = self.embed_model.encode([query])
        distances, indices = self.index.search(query_emb, k)
        return [self.chunks[i] for i in indices[0]]

    def generate_answer(self, query):
        """Generate answer using retrieved chunks + LLM"""
        retrieved_chunks = self.retrieve(query)
        context = " ".join(retrieved_chunks)

        # Build strict prompt
        prompt = CUSTOM_PROMPT_TEMPLATE.format(context=context, question=query)

        # Generate response (deterministic with temperature=0.0)
        result = self.generator(
            prompt,
            max_length=512,
            temperature=0.0
        )
        return result[0]["generated_text"].strip()
