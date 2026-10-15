# 📊 Tablyze

Tablyze is an AI-powered CSV analysis tool that lets you upload datasets, instantly visualize key statistics, and generate human-readable insights using AI.

Built with **Next.js**, **FastAPI**, **Pandas**, **Plotly**, and **Groq AI**.

---

## ✨ Features

- 📂 Upload CSV files
- 📈 Interactive dashboard
- 📊 Summary statistics
- 🔍 Missing value analysis
- 📉 Correlation heatmap
- 📦 Data type detection
- 🤖 AI-generated dataset summary (Groq)
- ⚡ Fast API backend
- 🎨 Modern responsive UI

---

## 🛠️ Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Recharts

### Backend
- FastAPI
- Pandas
- NumPy
- Uvicorn

### AI
- Groq API
- Llama 3

---

## 📸 Screenshots

> upcoming...

```
/screenshots
    dashboard.png
    upload.png
    summary.png
```

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/yourusername/tablyze.git
cd tablyze
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend runs on:

```
http://localhost:8000
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:3000
```

---

## Environment Variables

Create `backend/.env` for backend-only secrets.

```env
GROQ_API_KEY=your_api_key_here
```

For local development, the frontend proxy defaults to `http://127.0.0.1:8000`.
To use a different backend, create `frontend/.env.local` and set:

```env
BACKEND_URL=http://127.0.0.1:8000
```

## Separate Deployment

Deploy `frontend/` and `backend/` as separate projects:

1. Set the frontend project's root directory to `frontend/` and deploy it as a
   Next.js application.
2. Set the backend project's root directory to `backend/` and run
   `uvicorn main:app --host 0.0.0.0 --port 8000` (use the port required by the
   hosting provider).
3. Set `BACKEND_URL` in the frontend project's server environment to the
   backend's public HTTPS origin, such as `https://api.example.com`. Do not
   include `/upload` or `/api/agent/investigate` in this value.
4. Configure backend secrets such as `GROQ_API_KEY` in the backend project's
   environment. Keep these secrets out of the frontend environment.

The browser calls the frontend's same-origin `/api/upload` and
`/api/agent/investigate` routes. Those Next.js route handlers forward requests
to the backend's `/upload` and `/api/agent/investigate` endpoints using the
server-only `BACKEND_URL`; the browser never needs to know the backend URL.
Because of this proxy, browser CORS configuration is not needed for the normal
deployment flow. If a browser is configured to call the backend directly, set
the backend's `CORS_ORIGINS` environment variable to the frontend origin.

**Backend state limitation:** uploaded datasets are currently held in the
backend process's memory, and only the most recently uploaded dataset is
available for investigation. Use a persistent, single-process backend for this
version. Serverless or multi-instance deployments need shared, session-scoped
dataset storage before upload and investigation requests can reliably reach
the same dataset.

---

## Project Structure

```
tablyze/
│
├── frontend/
│   ├── app/
│   ├── public/
│   ├── package.json
│   └── package-lock.json
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── tests/
└── README.md
```

---

## How It Works

1. Upload a CSV file.
2. FastAPI processes the dataset using Pandas.
3. Statistical summaries are generated.
4. Correlations and missing values are computed.
5. A compact JSON summary is sent to Groq.
6. AI returns the natural-language explanation.
7. Results are displayed in an interactive dashboard.

---

## Example AI Input

```json
{
  "rows": 891,
  "columns": 12,
  "missing": {
    "Age": 177,
    "Cabin": 687
  },
  "correlations": {
    "Fare-Pclass": -0.55
  }
}
```

---

## Future Improvements

- Export reports as PDF
- More visualization types
- Multiple dataset comparison
- User authentication
- Drag-and-drop upload
- AI recommendations for preprocessing

---

## Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

## License

This project is licensed under the MIT License.

---

## Author

**Shruti Bhute**

If you found this project useful, consider giving it a ⭐ on GitHub.
