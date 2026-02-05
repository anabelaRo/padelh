# 🎾 Padel Pro Americano - Tournament Manager

![Versión](https://img.shields.io/badge/version-1.0.0-emerald)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Dexie](https://img.shields.io/badge/Dexie.js-IndexedDB-blue?style=for-the-badge)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

Una aplicación web moderna, rápida y **offline-first** para gestionar torneos de Padel formato Americano. Diseñada para funcionar perfectamente en dispositivos móviles, permitiendo a los organizadores cargar resultados en la cancha sin complicaciones.

---

## ✨ Características Principales

* **🏆 Gestión de Zonas:** Creación automática de grupos (Round Robin) con solo pegar las parejas desde WhatsApp.
* **📊 Tabla de Posiciones en Tiempo Real:** Cálculo automático de:
    * **PJ:** Partidos Jugados.
    * **PG:** Partidos Ganados.
    * **GG:** Games Ganados.
    * **DIF:** Diferencia de Games (+/-).
* **⚡ Playoffs Automáticos:** Generación de llaves (8vos, 4tos, Semis y Final) basada en los clasificados de cada zona.
* **🔄 Progresión Inteligente:** Al cargar un resultado en Playoff, el ganador avanza automáticamente a la siguiente ronda.
* **📱 Diseño Mobile-First:** Interfaz táctil, limpia y minimalista usando Tailwind CSS y Lucide Icons.
* **💾 Almacenamiento Local:** Los datos se guardan en el navegador (IndexedDB) mediante **Dexie.js**, por lo que no pierdes nada si se refresca la página o pierdes conexión.

---

## 🛠️ Instalación y Configuración

Sigue estos pasos para correr el proyecto localmente:

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/TU_USUARIO/nombre-del-repo.git](https://github.com/TU_USUARIO/nombre-del-repo.git)
   cd nombre-del-repo
Instalar dependencias:

Bash
npm install
Iniciar el servidor de desarrollo:

Bash
npm run dev
Abrir el navegador: Visita http://localhost:5173

🚀 Despliegue en Netlify
El proyecto está listo para ser desplegado en Netlify.

Configuración recomendada:

Build Command: npm run build o npx vite build

Publish directory: dist

Node Version: 18+

Tip: Si experimentas errores de permisos en el build, utiliza el comando npx vite build y asegúrate de limpiar el caché en el panel de Netlify (Clear cache and deploy site).

📂 Estructura del Proyecto
Plaintext
src/
 ├── components/       # Componentes reutilizables (Tablas, Cards)
 ├── db/               # Configuración de Dexie.js (IndexedDB)
 ├── logic/            # El "cerebro": cálculo de posiciones y progresión de llaves
 ├── pages/            # Vistas principales (Dashboard, Creator, Detail)
 └── App.tsx           # Router y estructura base
📝 Cómo cargar parejas (Formato WhatsApp)
El creador de torneos es flexible. Puedes copiar y pegar tu lista de WhatsApp en los siguientes formatos y el sistema los normalizará automáticamente:

Jugador 1 - Jugador 2

Jugador 1-Jugador 2

Jugador 1 / Jugador 2

🤝 Contribuciones
Si tienes ideas para mejorar la lógica de desempate o añadir nuevas funciones:

Haz un Fork del proyecto.

Crea una rama con tu mejora (git checkout -b feature/MejoraIncreible).

Haz un Commit de tus cambios (git commit -m 'Add some feature').

Haz un Push a la rama (git push origin feature/MejoraIncreible).

Abre un Pull Request.

📄 Licencia
Este proyecto es de código abierto bajo la licencia MIT. ¡Úsalo para potenciar el padel en tu club! 🎾

Desarrollado con ❤️ para la comunidad de Padel.
