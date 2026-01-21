<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
# 🧺 Offline POS & Inventory System (iPad)

A simple offline Point-of-Sale (POS) and inventory system built for a small fruits and vegetables business.

This project was created as a **learning project** and a **personal-use POS** for a family business.

---

## 📌 Why this exists

Small vendors often:
- Don’t want monthly POS subscriptions
- Don’t always have internet
- Just need something simple and reliable

This app runs **entirely in the browser** and stores data locally on the device.

---

## 🛠 Tech Stack

- **React** (Vite)
- **JavaScript**
- **HTML / CSS**
- **localStorage** (acts as the database)
- **PWA-ready** (offline-capable)

---

## ✨ Features

- Add fruits & vegetables to inventory
- Support for multiple units:
  - Kilogram (kg)
  - Grams (g)
  - Per piece (pcs)
  - Tali
- Customer cart system
- Manual weight input
- Automatic price calculation
- Complete orders
- View completed orders
- Remove completed orders (mistake handling)
- Daily sales summary
- View sales by selected date
- Works offline after initial load

---

## 🧠 How data is stored

This app **does NOT use a backend or database**.

All data is stored using:

```txt
Browser localStorage
>>>>>>> f9e1d780a584324d911ca19ff747c6fafa2683c7
