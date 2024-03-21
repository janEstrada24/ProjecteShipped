import psycopg2
import csv
import os

def get_unique_csv_name():
    i = 1
    while True:
        output_file = f'{output_dir}/prova{i}.csv'
        if not os.path.exists(output_file):
            return output_file
        i += 1

    

table_name = 'posiciovaixell'
output_dir = 'python'
output_file = get_unique_csv_name()


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
query = f"DELETE FROM {table_name}"
cur.execute(query)
conn.commit()
cur.close()
conn.close()


print(f'CSV file created at {output_file}')