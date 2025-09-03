import os
import PyPDF2
import pickle
import faiss
from sentence_transformers import SentenceTransformer

DATA_DIR = "data"
VECTOR_DIR = "vectorstore"

os.makedirs(VECTOR_DIR, exist_ok=True)

def load_pdfs(data_dir):
    text = ""
    for file in os.listdir(data_dir):
        if file.endswith(".pdf"):
            with open(os.path.join(data_dir, file), "rb") as f:
                reader = PyPDF2.PdfReader(f)
                for page in reader.pages:
                    text += page.extract_text() + "\n"
    return text

def split_text(text, chunk_size=500):
    words = text.split()
    chunks, current_chunk = [], []
    for word in words:
        current_chunk.append(word)
        if len(current_chunk) >= chunk_size:
            chunks.append(" ".join(current_chunk))
            current_chunk = []
    if current_chunk:
        chunks.append(" ".join(current_chunk))
    return chunks

def create_faiss_index(chunks, model):
    embeddings = model.encode(chunks)
    dim = embeddings.shape[1]
    index = faiss.IndexFlatL2(dim)
    index.add(embeddings)
    return index, embeddings

if __name__ == "__main__":
    print("🔄 Loading PDFs...")
    text = load_pdfs(DATA_DIR)
    chunks = split_text(text)

    print("🔄 Creating embeddings...")
    model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
    index, embeddings = create_faiss_index(chunks, model)

    print("💾 Saving FAISS index and chunks...")
    faiss.write_index(index, os.path.join(VECTOR_DIR, "faiss_index.bin"))
    with open(os.path.join(VECTOR_DIR, "chunks.pkl"), "wb") as f:
        pickle.dump(chunks, f)

    print("✅ Memory created successfully!")
