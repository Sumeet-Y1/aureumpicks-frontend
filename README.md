# AureumPicks Frontend

AureumPicks is a React + Vite frontend for a luxury ecommerce experience.  
This project is connected to a Spring Boot backend for authentication, products, and cart operations.

## Tech Stack

- React
- Vite
- React Router
- Axios
- Tailwind CSS
- Framer Motion

## Features

- Product listing and product detail pages
- Authentication with token persistence
- Cart flow with backend integration when logged in
- Local fallback product data when the backend is unavailable
- Protected routes for account, checkout, orders, and wishlist
- Cloudflare Pages SPA routing support

## Project Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Preview the production build locally:

```bash
npm run preview
```

## Environment Variables

Create your environment files based on `.env.example`.

### Development

```env
VITE_API_URL=http://localhost:8080/api
```

### Production

```env
VITE_API_URL=https://aureumpicks.onrender.com/api
```

## Backend Connection

The frontend uses `VITE_API_URL` through the Axios instance in `src/api/axios.js`.

Current backend integrations:

- `POST /auth/login`
- `POST /auth/signup`
- `GET /products/all`
- `GET /products/:id`
- `GET /products/category/:category`
- `GET /cart`
- `POST /cart/add`
- `PUT /cart/update/:cartId`
- `DELETE /cart/remove/:cartId`
- `DELETE /cart/clear`

Some areas still use local storage because matching backend endpoints are not yet available:

- Orders
- Wishlist
- Profile updates

## Deployment

This frontend is ready for Cloudflare Pages.

- Build command: `npm run build`
- Output directory: `dist`
- SPA redirects file: `public/_redirects`

Set this environment variable in Cloudflare Pages:

```env
VITE_API_URL=https://aureumpicks.onrender.com/api
```

## Favicon

The app favicon is served from:

```text
public/picks.ico
```

and linked in `index.html`.

## Notes

- The backend may take a little time to wake up on Render free tier.
- The shop and product pages fall back to local mock data if the API cannot be reached.

