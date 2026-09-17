# Scheme Saathi (frontend)

Citizen-facing MVP for discovering government schemes.

## Run

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

## Notes

- Authentication is mocked in the browser. Passwords are never stored.
- Scheme data lives in `src/data/mockSchemes.js`.
- Axios is configured for `http://localhost:5000/api` for the future Express backend.
- Do not put AI API keys in the frontend.
