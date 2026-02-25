import csv
from pathlib import Path

DIR = Path(__file__).parent
INPUT_FILE = DIR / "leads.csv"
OUTPUT_FILE = DIR / "cleaned_leads.csv"

with open(INPUT_FILE, newline="") as f:
    reader = csv.DictReader(f)
    rows = list(reader)
    fieldnames = reader.fieldnames

seen_emails = set()
cleaned_rows = []

for row in rows:
    email = row["email"]
    if email not in seen_emails:
        seen_emails.add(email)
        cleaned_rows.append(row)

with open(OUTPUT_FILE, "w", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(cleaned_rows)

starting = len(rows)
ending = len(cleaned_rows)
removed = starting - ending

print(f"Starting rows:     {starting}")
print(f"Duplicates removed:{removed}")
print(f"Ending rows:       {ending}")
print(f"Output written to: {OUTPUT_FILE}")
