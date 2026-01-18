Starflix is a full-stack streaming platform prototype built with PHP, HTML, CSS, and JavaScript.
It’s my first time creating a system with separate user and admin access, and I intentionally explored more complex methods instead of going straight to basic PHP CRUD, just to challenge myself and learn different approaches.

This project simulates how a real streaming service might manage users, content, and analytics.

## 🚀 Key Features

### 🔐 Authentication & Access Control
- Secure **Sign Up / Login**
- Session-based authentication
- Role-based routing (User vs Admin)

---

## 👩‍💻 User Experience

After login, users are greeted by name and redirected to their **personal dashboard**.

**User Capabilities:**
- Personalized home screen
- Account overview
- Favorites & Watchlist (Letterboxd-inspired)
- Subscription plan viewing & upgrading
- Update profile information:
  - First Name
  - Last Name
  - Email
- Account switching

---

## 🛠 Admin Dashboard

Admins access a dedicated dashboard with system analytics and management tools.

**Admin Capabilities:**
- 📊 View platform analytics:
  - Total Movies, Series, TV Shows
  - Most viewed titles
  - New releases
  - Active users
- 🎬 Content Management:
  - Add / Update / Archive:
    - Movies
    - Series
    - TV Shows
- 👥 User Management:
  - View and manage users
  - Update or archive accounts
- 📄 Activity Records:
  - Monitor user engagement
- 🧑‍💼 Staff & Admin Accounts:
  - Create employee and admin accounts
  - Update profiles and passwords

---

## 🧱 Tech Stack

- **Backend:** PHP  
- **Frontend:** HTML, CSS, JavaScript  
- **Database:** MySQL  
- **Auth:** Session-based authentication

---

## 🖼 Screenshots

```md
![Register Page](screenshots/signup.png)
![User Dashboard](screenshots/starflix-1.png)
![Admin Dashboard](screenshots/admin-1.png)

Built by **Kate Sobremonte** 3rd Year BS Information Systems — Full Stack Developer (PHP / JS / Web)

