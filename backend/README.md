# Scheme Saathi backend

Express + MongoDB Atlas API for the Scheme Saathi frontend.

## 1. Install Node.js

Install Node.js 18+ from https://nodejs.org and confirm:

```bash
node -v
npm -v
```

## 2. Open the backend folder

From the project root (`Scheme-saathi-`):

```bash
cd backend
```

## 3. Install dependencies

```bash
npm install
```

## 4. Create `.env`

```bash
copy .env.example .env
```

On macOS/Linux:

```bash
cp .env.example .env
```

## 5. Add MongoDB Atlas

In `.env` set:

```
MONGO_URI=mongodb+srv://USER:PASSWORD@CLUSTER/scheme-saathi?retryWrites=true&w=majority
```

Allow your IP in the Atlas Network Access list.

## 6. Add a JWT secret

```
JWT_SECRET=a-long-random-string
```

## 7. Optional: AI key

The assistant works without a key using database-backed answers.

To enable a live model:

```
AI_API_KEY=your_key
AI_PROVIDER=openai
AI_MODEL=gpt-4o-mini
```

`AI_PROVIDER` can be `openai` or `groq`. The key never goes to the React app.

## 8. Seed schemes

```bash
npm run seed
```

This upserts demo schemes (no duplicates on re-run).

## 9. Start the backend

Development (nodemon):

```bash
npm run dev
```

Production:

```bash
npm start
```

API: http://localhost:5000/api/health

## 10. Start the frontend

In a second terminal, from the **project root** (this repo’s React app lives at the root, not in a `frontend/` folder):

```bash
npm install
npm run dev
```

Open http://localhost:5173

## 11. Quick API checks

Register:

```bash
curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d "{\"fullName\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"secret1\",\"confirmPassword\":\"secret1\"}"
```

List schemes:

```bash
curl http://localhost:5000/api/schemes
```

Login, then call `/api/auth/me` with `Authorization: Bearer <token>`.
