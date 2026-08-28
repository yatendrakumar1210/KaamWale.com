# LabourChowk.com — Labour Booking Platform

**Har Kaam Ke Liye Labour**

LabourChowk is a city-based labour booking platform serving Indian local-services markets (starting with **Bulandshahr, Uttar Pradesh** and NCR). Customers request workers for construction, shifting, loading, cleaning, agriculture, digging, masons (Raj Mistri), and skilled trades.

---

## 🔒 Core Privacy & Business Rule

> **IMPORTANT PRIVACY ASSURANCE:**
> The customer **does NOT browse or select individual labourers**. Customers submit booking requests specifying required worker count, date, duration, shift time, and location. LabourChowk's internal operations team handles worker assignment behind the scenes.
>
> **Customer-facing APIs and UI components strictly hide individual labourer profiles, phone numbers, contractor details, and company names.**

---

## 🚀 Key Features

### 👤 Customer Portal
- **Hero & Search Widget**: Select service, choose city, instant booking trigger.
- **Majdoor Services Directory**: Dedicated portal for 12+ daily wage labour types (Construction Labour, Loading/Unloading, House Shifting, Digging, Farm Labour, Demolition, Factory Helpers).
- **Interactive 6-Step Booking Wizard**:
  1. Select Service
  2. Labour Requirement (Worker counter `[-] N [+]`, Date, Duration)
  3. Working Shift Hours (Start & End time)
  4. Location (City, Area, Address, GPS location shortcut)
  5. Work Details & optional photo attachment preview
  6. Customer Details & Cost Summary check
- **Booking Confirmation & Live Tracking**:
  - Live stepper timeline: Request Submitted → Booking Received → Finding Labour → Labour Confirmed → Work Started → Work Completed.
- **Customer Dashboard**: Overview KPI cards (Active, Completed, Cancelled), active booking spotlight, filterable history cards/tables, and post-service review submission.

### 🛡️ Admin & Operations Portal (`/admin`)
- **Executive Operations Dashboard**: Live KPIs (Total Bookings, Today's, Pending, Confirmed, Completed, Active Workforce), weekly trend charts, popular service share.
- **Booking Queue Management**: Table with status filtering, customer details, requirement view, and 1-click workforce assignment modal.
- **Internal Workforce Directory**: Comprehensive list of verified internal labourers (Worker ID, Skills, Experience, Daily Rates, Service Areas, Availability).
- **Assignment System**: Match and assign N internal workers to customer bookings. Automatically updates status to **Confirmed** (Customer only sees "Booking Confirmed", never worker details!).
- **Service & City Management**: Catalog controls & city coverage management (Bulandshahr UP, Noida, Delhi NCR, Lucknow).

---

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite), React Router v6, Tailwind CSS, Lucide Icons, Axios, Recharts.
- **Backend**: Node.js, Express.js, MongoDB / Mongoose, Jsonwebtoken (JWT), bcryptjs.
- **Data Engine**: Includes dual MongoDB connection + out-of-the-box in-memory seed engine with sample Bulandshahr UP bookings, verified workers, and demo users.

---

## ⚙️ How to Run Locally

### 1. Start Backend API Server
```bash
cd backend
npm install
npm run dev
```
Running on: `http://localhost:5000`

### 2. Start Frontend Web App
```bash
cd frontend
npm install
npm run dev
```
Running on: `http://localhost:3000`

---

## 🔑 Demo Login Accounts

Use the **Demo Role Switcher** top bar to toggle between views with 1 click, or log in with these credentials:

| Role | Email / Phone | Password |
|---|---|---|
| **Customer** | `customer@labourchowk.com` / `9876543210` | `password123` |
| **Admin** | `admin@labourchowk.com` / `9999999999` | `admin123` |
| **Operations** | `ops@labourchowk.com` / `9811223344` | `admin123` |

---

© 2026 LabourChowk.com. All rights reserved.
