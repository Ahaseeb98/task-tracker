# 📋 Task Tracker

A mobile-first task management app designed for seamless communication between employees and employers.

## 🚀 Overview

Task Tracker allows users to assign, track, and manage tasks between team members in a simple, mobile-friendly interface. Built with modern technologies and structured as a monorepo for mobile and backend development.

---

## 🧰 Tech Stack

- **Frontend (Mobile App):** React Native, Expo, TypeScript  
- **Backend (API):** NestJS, MongoDB  
- **Package Manager:** pnpm  
- **Monorepo:** Structured with separate folders for mobile and backend apps

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/task-tracker.git
cd task-tracker
```

### 2. Install Dependencies

Use `pnpm` to install dependencies at the root, mobile, and backend:

```bash
pnpm install
cd apps/mobile && pnpm install
cd ../backend && pnpm install
```

### 3. Environment Variables

Inside the `backend` folder, create a `.env` file:

```
MONGODB_URI=your_mongo_connection_string
PORT=3000
```

Update the mobile app API config:

- Go to the `Contents` folder inside `mobile`
- Search for `API_BASE_URL`
- Replace it with your local IP address, e.g.:

```ts
export const API_BASE_URL = "http://192.168.1.x:3000";
```

Make sure your mobile device is on the same Wi-Fi network to access the local backend.

---

## ▶️ Usage

### Start the Backend

```bash
cd backend
pnpm start:dev
```

This starts the NestJS server on `http://localhost:3000`.

### Start the Mobile App

```bash
cd mobile
pnpm start
```

This will open the Expo developer tools in your browser. You can:
- Scan the QR code with Expo Go
- Run on an Android/iOS simulator
- Preview on web

---

## ✅ Features

- 📌 Assign and update tasks
- 🧾 Track task statuses (pending, in-progress, completed)
- 👤 Role-based access (Employer/Employee)
- 🔄 Sync tasks in real time (mobile <-> backend)
- 📱 Optimized for mobile-first interaction

---

## 📝 Notes

- Always make sure to update the IP address in `API_BASE_URL` before running on a physical device.
- MongoDB must be running and accessible by the backend.

---

## 📦 Package Management

This project uses `pnpm` for efficient workspace management. All dependencies should be installed using:

```bash
pnpm install
```

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change.

---

## 📄 License

MIT © 2025 Abdul Haseeb
