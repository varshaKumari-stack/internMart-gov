## Overview

**InternMart Gov** is a modern React + Vite UI system featuring a travel/intern-style platform with:

- ⚡ Fast landing page experience
- 🔐 Authentication flow (login/signup/captcha/logout)
- 🧭 Protected routing system
- 🛒 Cart + payment simulation flow
- 🎮 Interactive UI behavior & micro-interactions

It is designed as a **UI-rich frontend system with immersive transitions and simulated user flows**.

## ⚙️ Tech Stack

- ⚛️ React (UI framework)
- ⚡ Vite (build tool)
- 🎨 Tailwind CSS (styling)
- 🎞 Framer Motion (animations)
- 🎯 lucide-react (icons)
- 🌐 react-router-dom (routing)

| Route      | Description          |
| ---------- | -------------------- |
| `/`        | Landing Page         |
| `/login`   | Login Screen         |
| `/signup`  | User Registration    |
| `/logout`  | Logout Handler       |
| `/captcha` | Captcha Verification |

| Route           | Description      |
| --------------- | ---------------- |
| `/dashboard`    | User Dashboard   |
| `/products`     | Packages Listing |
| `/packages/:id` | Package Details  |
| `/cart`         | Shopping Cart    |
| `/payment`      | Payment Flow     |
| `/success`      | Success Screen   |

## 📄 Feature Breakdown

🏠 Landing Page (LandingPage.jsx)

A highly animated public entry page with layered UI components:

TopBar & Navbar
Hero Section
Fake Stats Panel
Ads Simulation
News & Notifications
Virus Warning UI
Footer Section
✨ Behavior
Uses React state + effects for dynamic UI simulations
Creates subtle “system-style UI activity” feel
🔐 Authentication System
Login (LoginPage.jsx)
Email/password authentication UI
Integrated with useAuth().login()
Error handling with UI feedback
Redirect → /dashboard
Signup (Signup.jsx)
User registration form
Password visibility toggle
Basic validation flow
Redirect → /login
Captcha (Captcha.jsx)
Auto-generated captcha system
Timer-based refresh
Success → /dashboard
Logout (logout.jsx)
Clears session via useAuth().logout()
Redirect → /login
📊 Dashboard (Dashboard.jsx)

A protected user dashboard featuring:

Cart state loaded from localStorage
Random notification system
Subtle glitch-style UI effects
Navigation to products

➡️ Action:

“Book Travel” → /products
📦 Packages (Packages.jsx)

Core product browsing page.

## Features:

## 🏠 Landing Page (LandingPage.jsx)

— A highly animated public entry page with layered UI components:

💠 TopBar & Navbar
💠Hero Section
💠Fake Stats Panel
💠Ads Simulation
💠News & Notifications
💠Virus Warning UI
💠Footer Section

⭐ Uses React state + effects for dynamic UI simulations
⭐Creates subtle “system-style UI activity” feel

## 🔐 Authentication System

💠Login (LoginPage.jsx)
💠Email/password authentication UI
💠Integrated with useAuth().login()
💠Error handling with UI feedback
💠Redirect → /dashboard

## Signup (Signup.jsx)

💠User registration form
💠Password visibility toggle
💠Basic validation flow
💠Redirect → /login

## Logout (logout.jsx)

💠Clears session via useAuth().logout()
💠Redirect → /login

## Dashboard (Dashboard.jsx)

✨A protected user dashboard featuring:

✨Cart state loaded from localStorage
✨Random notification system
✨Subtle glitch-style UI effects
✨Navigation to products

➡️ Action:
“Book Travel” → /products

## Packages (Packages.jsx)

## Features:

💠Search + filter system (budget / premium)
💠Package cards with metadata
💠Interactive booking flow

## 🎮 Interaction:

“Book Now” triggers animated flow
💠On success:
💠Adds item to cart
💠Saves to localStorage
💠Redirect → /payment

## Package Details (PackageDetail.jsx)

✨Dynamic route-based detail view (:id)
✨Loader state handling
✨Fallback UI for invalid IDs

## Cart (Cart.jsx)

✨Displays cart items using useCart()
✨Shows total calculation
✨Checkout button → /payment
✨Empty state handling included

## Empty state handling included

## Payment (Payment.jsx)

✨Load cart from storage
✨Click Pay → fake processing animation
✨Captcha verification modal
✨Success → clear cart → /success

## Success Page (Success.jsx)

💠Payment confirmation UI
💠Auto redirect countdown
💠Manual navigation option
💠Cart cleanup handled

## Keep routes consistent with App.jsx

## Protected routes require auth context
