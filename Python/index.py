import psycopg2
import csv
import os


table_name = 'usuari'
output_dir = 'python'
output_file = os.path.join(output_dir, 'prova.csv')

conn = psycopg2.connect(
    host='localhost',
    database='admin',
    user='admin',
    password='8*U9l9',
    port='1433'
)
cur = conn.cursor()

query = f"SELECT * FROM {table_name}"
cur.execute(query)
with open(output_file, 'w') as csv_file:
    writer = csv.writer(csv_file)
    column_names = [desc[0] for desc in cur.description] if cur.description else []
    writer.writerow(column_names)
    for row in cur:
        writer.writerow(row)
cur.close()
conn.close()

print(f'CSV file created at {output_file}')