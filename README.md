# 🛠️ Drilling Shift Scheduler

Web application for **automatic scheduling of drilling supervisors**, enforcing strict daily coverage rules and operational constraints.

The system generates a **visual schedule** ensuring that **exactly two supervisors are drilling every day**, without violating business rules.

---
## 🚀 Live Demo

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://drilling-shift-scheduler.vercel.app)

---

## 📋 Business Rules Implemented

✔ Always **exactly 2 supervisors drilling per day**  
✔ Never 3 supervisors drilling at the same time  
✔ Never only 1 supervisor drilling (once S3 is active)  
✔ Supervisor **S1 always completes the full cycle**  
✔ Supervisors **S2 and S3 dynamically adjust**  
✔ Validation of invalid patterns (S-S, S-B, 1-day drilling, etc.)

---

## ⚙️ Schedule Configuration

The user can dynamically configure:

- **Work days (N)**
- **Rest days (M)**
- **Induction days** (1–5)
- **Total drilling days** (30, 90, 950, etc.)

The **Calculate Schedule** button:
- Is disabled until all inputs are valid
- Recalculates correctly when values change

---

## 📊 Visualization

- Daily table per supervisor (S1, S2, S3)
- States represented with colors:
  - 🟦 Ascent (S)
  - 🟧 Induction (I)
  - 🟩 Drilling (P)
  - 🟥 Descent (B)
  - ⬜ Rest (D)
- Additional `#P` row showing drilling supervisors per day
- Invalid days visually highlighted

---

## 🚨 Validation & Status

- Snackbar error feedback for invalid configurations
- Schedule status indicator:
  - ✅ **Valid**: all days have correct coverage
  - ⚠️ **Needs review**: days with incorrect coverage detected

---

## 📤 Export Options

The generated schedule can be exported as:

- 📄 **PDF**
- 📊 **Excel**
- 📝 **Word**

If no schedule exists, a non-intrusive warning is displayed.

---

## 🌗 Light / Dark Mode

- Light / Dark theme toggle
- Adaptive background:
  - Light: `#f6f7f8`
  - Dark: `#121212`
- Modern UI with reusable gradient buttons and soft shadows

---

## 🧪 Mandatory Test Scenarios Covered

✔ **14x7** schedule with 5 induction days  
✔ **21x7** schedule with 3 induction days  
✔ **10x5** schedule with 2 induction days  
✔ **14x6** schedule with 4 induction days and 950 drilling days  

---

## 🧱 Tech Stack

- **Next.js (App Router)**
- **React**
- **Material UI (MUI)**
- **TypeScript**
- **Jest + Testing Library**
- **Yarn**

---

## 🏗️ Local Setup

```bash
# Clone repository
git clone <repo-url>

# Install dependencies
yarn install

# Run development server
yarn dev
