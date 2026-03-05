import os
from google.cloud import bigquery

print("Inicio del script...")

# Verifica la variable de entorno
cred_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
if not cred_path:
    print("ERROR: La variable GOOGLE_APPLICATION_CREDENTIALS no está configurada.")
else:
    print(f"Variable de entorno configurada: {cred_path}")

# Prueba la conexión a BigQuery
try:
    print("Intentando conectar con BigQuery...")
    client = bigquery.Client()
    print(f"Conexión exitosa. Proyecto activo: {client.project}")
except Exception as e:
    print("Error al conectar con BigQuery:", e)
