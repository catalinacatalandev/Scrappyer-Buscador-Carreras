from flask import Flask, jsonify, Response, render_template
from google.cloud import bigquery
import unicodedata
import json
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# --- Configuración desde variables de entorno ---
PROJECT_ID = os.environ.get("PROJECT_ID", "redprueba2")
# GOOGLE_APPLICATION_CREDENTIALS debe estar definido en la máquina
# export GOOGLE_APPLICATION_CREDENTIALS="/ruta/a/credenciales.json"

QUERY = """
    SELECT `Institucion`, `AreaDeEducacion`, `Carrera`, `Sede`, `Modalidad`, `Regimen`,
           `Duracion`, `Matricula`, `Arancel`, `Aranceldereferencia`
    FROM `redprueba2.datauniversity.TablaMaestraUniv`
"""

def normalize_text(value):
    if isinstance(value, str):
        try:
            value = unicodedata.normalize('NFC', value)
        except Exception:
            pass
    return value

def query_bigquery(project_id, query):
    client = bigquery.Client(project=project_id)
    query_job = client.query(query)
    results = query_job.result()
    data = [{key: normalize_text(value) for key, value in dict(row).items()} for row in results]
    return data

# --- Endpoints de Flask ---
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/resultados')
def resultados():
    return render_template('resultados.html')

@app.route('/data', methods=['GET'])
def get_data():
    try:
        data = query_bigquery(PROJECT_ID, QUERY)

        # Ajustar 'Arancel' solo para DUOC UC
        for record in data:
            if record['Institucion'] == 'DUOC UC' and record['Arancel']:
                arancel_value = record['Arancel'].replace('$', '').replace('.', '')
                try:
                    arancel_value = float(arancel_value) * 10
                    record['Arancel'] = f"${arancel_value:,.0f}".replace(',', '.')
                except ValueError:
                    pass

        response = Response(
            json.dumps(data, ensure_ascii=False),
            content_type='application/json; charset=utf-8'
        )
        return response
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)