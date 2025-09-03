import streamlit as st
from connect_memory_with_llm import MediMemory

st.set_page_config(page_title="🩺 MediBot", layout="wide")
st.title("🩺 MediBot - Medical Chat Assistant")

st.sidebar.header("ℹ️ About")
st.sidebar.write("This bot uses FAISS + Hugging Face LLM to answer questions from medical PDFs.")

if "memory" not in st.session_state:
    st.session_state.memory = MediMemory()

query = st.text_input("Ask your medical question:")

if query:
    with st.spinner("Thinking..."):
        answer = st.session_state.memory.generate_answer(query)
    st.write("### 🧾 Answer")
    st.write(answer)
