# 🚀 KaamWale (LabourChowk) Deployment Guide

This repository is ready for deployment on **Vercel** (Frontend) and **Render** (Backend).

---

## 1. 🌐 Backend Deployment on Render

1. Go to [Render Dashboard](https://dashboard.render.com/) and click **New +** → **Web Service**.
2. Connect your Git repository (`LabourChowk.com`).
3. Set the following configuration:
   - **Name**: `kaamwale-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. Add Environment Variables (under **Environment Variables**):
   - `PORT` = `5000`
   - `MONGODB_URI` = *(Your MongoDB Atlas Connection String)*
   - `JWT_SECRET` = *(Your JWT Secret Key)*
5. Click **Create Web Service**.
6. Once deployed, copy your backend URL (e.g., `https://kaamwale-backend.onrender.com`).

---

## 2. ⚡ Frontend Deployment on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New...** → **Project**.
2. Import your Git repository (`LabourChowk.com`).
3. Set the following configuration:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add Environment Variable:
   - `VITE_API_URL` = `https://kaamwale-backend.onrender.com/api` *(replace with your Render backend URL)*
5. Click **Deploy**.

---

## 🛠️ Included Deployment Files
- `frontend/vercel.json` (SPA routing handling)
- `vercel.json` (Monorepo root config)
- `render.yaml` (Render Blueprint definition)
- `backend/server.js` (CORS enabled for cross-origin production requests)
