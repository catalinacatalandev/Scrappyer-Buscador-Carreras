# 🎓 Scrappyer - Buscador de Carreras 
Aplicación Web que desarrollé en conjunto con mi equipo como proyecto de Titulo. 
**Scrappyer** es una aplicación web diseñada para que los estudiantes chilenos puedan **buscar carreras universitarias** de manera rápida y filtrada según sus preferencias. Además, cuenta con una **calculadora de aranceles** para simular el costo de la carrera según becas y créditos disponibles.

## 🚀 Funcionalidades

- 🔹 Búsqueda dinámica de carreras filtrando por:
  - Institución
  - Área de estudio
  - Modalidad (presencial, online, híbrida)
  - Régimen (diurno, vespertino)
  - Nombre de la carrera
- 🔹 Calculadora de aranceles:
  - Simula el costo anual y total según beca y crédito.
- 🔹 Resultados mostrados en tabla con scroll y selección de fila.
- 🔹 Interfaz responsiva, pensada para escritorio y móviles.

## 🛠 Tecnologías usadas

- **Backend:** Python, Flask  
- **Frontend:** HTML, CSS, JavaScript  
- **Base de datos:** Google BigQuery  
- **Otros:** Flask-CORS para manejo de peticiones entre páginas  

## 💻 Instalación y uso local

Sigue estos pasos para ejecutar **Scrappyer** en tu computadora:

1. **Clonar el repositorio**  
   Abre la terminal o PowerShell y ejecuta:  
   ```bash
   git clone https://github.com/catalinacatalandev/Scrappyer-Buscador-Carreras.git
   cd Scrappyer-Buscador-Carreras

2. **Crear y activar un entorno virtual**
Esto ayuda a mantener las dependencias del proyecto aisladas:
``` bash
python -m venv venv
.\venv\Scripts\activate    # Windows PowerShell
#o en Linux/macOS
#source venv/bin/activate

3. **Instalar dependencias** 
Con el entorno virtual activado, instala los paquetes necesarios:  
```bash
pip install -r requirements.txt

4. **Configurar credenciales de Google Cloud**
La aplicación usa BigQuery, así que necesitas un archivo JSON con las credenciales:
```bash
set GOOGLE_APPLICATION_CREDENTIALS="ruta/a/redprueba2-1e1d743e5058.json"
# en Linux/macOS sería:
# export GOOGLE_APPLICATION_CREDENTIALS="ruta/a/redprueba2-1e1d743e5058.json"




