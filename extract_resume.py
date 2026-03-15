import PyPDF2

def extract_text_from_pdf(pdf_path):
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
    return text

# Extract text from the PDF
pdf_path = 'hirtheesh (2).pdf'
resume_text = extract_text_from_pdf(pdf_path)

# Save the extracted text to a file
with open('resume_text.txt', 'w', encoding='utf-8') as f:
    f.write(resume_text)

print("Resume text extracted and saved to resume_text.txt")