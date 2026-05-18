# InternMart Gov (InternMart UI)

## Overview

This project is a React + Vite application with a custom landing page experience.

- Landing page: `src/pages/LandingPage.jsx`
- Landing UI components: `src/components/landing/*`

## Tech Stack

- **React**
- **Vite**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **lucide-react** (icons)
- **react-router-dom** (routing)

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Routes (from `src/App.jsx`)

### Public

- `/` → `src/pages/LandingPage.jsx`
- `/login` → `src/pages/auth/LoginPage.jsx`
- `/signup` → `src/pages/auth/Signup.jsx`
- `/logout` → `src/pages/auth/logout.jsx`
- `/captcha` → `src/pages/auth/Captcha.jsx`

### Protected (inside `ProtectedRoute`)

- `/dashboard` → `src/pages/Dashboard.jsx`
- `/products` → `src/pages/Packages.jsx`
- `/packages/:id` → `src/pages/PackageDetail.jsx`
- `/cart` → `src/pages/Cart.jsx`
- `/payment` → `src/pages/Payment.jsx`
- `/success` → `src/pages/Success.jsx`

## Pages Documentation (basic)

### `src/pages/LandingPage.jsx`

- Public landing screen.
- Shows these components in order: `TopBar`, `Navbar`, `HeroSection`, `FakeStats`, `FakeAds`, `News`, `Notification`, `VirusWarning`, `Footer`.
- UI side effects: glitch/corruption style warnings using `useState` + `useEffect`.

### `src/pages/auth/LoginPage.jsx`

- Login UI (email + password).
- `useAuth().login()` call karke authenticated banata hai.
- Weak/invalid input par error visuals.
- Boss-fight overlay style UI: win hone par `navigate('/dashboard')`.

### `src/pages/auth/Signup.jsx`

- Signup form (name/email/password) + password show/hide.
- Basic validation.
- Success ke baad `navigate('/login')`.

### `src/pages/auth/Captcha.jsx`

- Captcha verification UI.
- Captcha auto-generate + auto-refresh timer.
- Verify successful hone par `navigate('/dashboard')`.

### `src/pages/auth/logout.jsx`

- `useAuth().logout()` karta hai.
- Logout ke baad redirect: `navigate('/login', { replace: true })`.

### `src/pages/Dashboard.jsx` (protected)

- Protected dashboard.
- localStorage se `cart` load.
- Random notifications show karta hai + glitch-like blur.
- “Book Travel” button: `navigate('/products')`.

### `src/pages/Packages.jsx` (protected)

- Packages listing + search + filter (`budget/premium`).
- “Book Now” ek boss-fight style effect ke baad package ko cart me add karta hai.
- Cart ko localStorage me save karke `navigate('/payment')`.

### `src/pages/PackageDetail.jsx` (protected)

- `:id` param ke basis pe package detail.
- Loader ke baad package milta hai, warna “Package not found” + back.

### `src/pages/Cart.jsx` (protected)

- Cart UI.
- `useCart()` se items + total.
- Checkout click → `navigate('/payment')`.
- Empty cart state + toast/loader visuals.

### `src/pages/Payment.jsx` (protected)

- Payment flow.
- localStorage se cart load.
- “Pay” → fake processing → captcha modal open.
- Captcha confirm hone par cart clear + `navigate('/success')`.

### `src/pages/Success.jsx` (protected)

- Payment success confirmation.
- `useCart().clearCart()`.
- Auto countdown ke through redirect (UI me countdown based) + buttons.

## Notes

If you modify page components, ensure routing/imports remain consistent with `src/App.jsx`.
