# 🎓 Scrappyer - Buscador de Carreras 
Aplicación Web que desarrollé en conjunto con mi equipo como proyecto de Titulo. 
**Scrappyer** es una aplicación web diseñada para que los estudiantes chilenos puedan **buscar carreras universitarias** de manera rápida y filtrada según sus preferencias. Además, cuenta con una **calculadora de aranceles** para simular el costo de la carrera según becas y créditos disponibles.

## 🚀 Funcionalidades
- 🔍 **Búsqueda de carreras** filtrando por:
  - 🏫 Institución
  - 🎓 Área de estudio
  - 💻 Modalidad (presencial, online, híbrida)
  - 🕒 Régimen (diurno, vespertino)
  - 📘 Nombre de la carrera
- 💰 **Calculadora de aranceles**:
  - Simula el costo anual y total según beca y crédito
- 📊 **Resultados en tabla**:
  - Scrollable y selección de fila
- 📱 **Interfaz responsiva**:
  - Optimizada para escritorio y móviles

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

- En Windows PowerShell:
```
python -m venv venv
.\venv\Scripts\activate
```
- En Linux/macOS:
```
python3 -m venv venv
source venv/bin/activate
```

3. **Instalar dependencias**
   Con el entorno virtual activado, instala las dependencias necesarias:
```
pip install -r requirements.txt
```

4. **Configurar credenciales de Google Cloud**
   1. Guarda tu archivo de credenciales JSON (por ejemplo redprueba2.json) en la carpeta del proyecto.
   2. Exporta la variable de entorno:
  - Windows PowerShell:
    ```
    $env:GOOGLE_APPLICATION_CREDENTIALS="C:\ruta\a\redprueba2.json"
    ```
  - Linux/macOS:
      ```
    export GOOGLE_APPLICATION_CREDENTIALS="/ruta/a/redprueba2.json"
    ```
5. **Ejecutar la aplicación**
    ```
     python app.py
    ```
Abre tu navegador y visita: http://127.0.0.1:5000 

## 🌐 Uso

Abre la página principal.

Selecciona filtros: Institución, Área de estudio, Modalidad, Régimen y Carrera.

Presiona Buscar para ver resultados.

Haz clic en una fila para usar la calculadora de aranceles.

Selecciona beca y/o ingresa crédito para calcular el costo estimado.

## 📝 Requisitos

Python 3.8 o superior

Flask

Google Cloud SDK y credenciales de BigQuery

Dependencias listadas en requirements.txt
## 📂 Estructura del proyecto 
```
Scrappyer-Buscador-Carreras/
├─ app.py
├─ requirements.txt
├─ README.md
├─ templates/
│  ├─ index.html
│  └─ resultados.html
├─ static/
│  ├─ css/
│  │  └─ styles.css
│  ├─ js/
│  │  ├─ index.js
│  │  ├─ resultados.js
│  │  └─ calculadora.js
│  └─ img/
│     ├─ header blue.png
│     ├─ icons8-barra-de-búsqueda-50.png
│     ├─ icons8-volver-40.png
│     └─ img-header.png
└─ .gitignore
```



    

















