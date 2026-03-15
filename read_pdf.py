import sys
import subprocess

try:
    import fitz  # PyMuPDF
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "PyMuPDF"], stdout=subprocess.DEVNULL)
    import fitz

def extract_text(pdf_path, out_path):
    try:
        doc = fitz.open(pdf_path)
        text = ""
        for page in doc:
            text += page.get_text() + "\n"
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(text)
        print("Done")
    except Exception as e:
        print(f"Error reading PDF: {e}")

if __name__ == "__main__":
    extract_text(sys.argv[1], sys.argv[2])
