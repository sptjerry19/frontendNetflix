# Frontend Setup Guide (VUE)

Update `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
    devtools: { enabled: true },

    modules: [
        "@nuxtjs/tailwindcss",
        "@pinia/nuxt",
        "@vueuse/nuxt",
        "@vee-validate/nuxt",
        "@sidebase/nuxt-auth",
    ],

    css: ["~/assets/css/main.css"],

    runtimeConfig: {
        public: {
            apiBase:
                process.env.NUXT_PUBLIC_API_BASE ||
                "http://localhost:8000/api/v1",
            appName: "Booking Sport",
            googleMapsKey: process.env.NUXT_PUBLIC_GOOGLE_MAPS_KEY || "",
        },
    },

    auth: {
        baseURL: process.env.AUTH_ORIGIN,
        provider: {
            type: "authjs",
        },
    },

    ssr: false, // SPA mode for better compatibility with Sanctum
});
```

## 🗂️ Recommended Folder Structure

```
booking_sport_frontend/
├── src/
│   ├── assets/
│   │   └── css/main.css
│   ├── components/
│   │   ├── Auth/
│   │   ├── Venue/
│   │   ├── Court/
│   │   ├── Booking/
│   │   └── UI/
│   ├── pages/
│   │   ├── Home.vue
│   │   ├── auth/
│   │   ├── venues/
│   │   ├── courts/
│   │   ├── bookings/
│   │   └── dashboard/
│   ├── router/
│   │   └── index.ts
│   ├── stores/
│   │   ├── auth.ts
│   │   ├── venue.ts
│   │   ├── booking.ts
│   │   └── ui.ts
│   ├── composables/
│   │   ├── useAuth.ts
│   │   ├── useApi.ts
│   │   └── useBooking.ts
│   ├── plugins/
│   │   └── axios.ts
│   └── types/
│       ├── auth.ts
│       ├── venue.ts
│       └── booking.ts
└── vite.config.ts

## 🔑 Authentication Setup

### 1. Sanctum SPA Configuration

Create `plugins/axios.client.ts`:

```typescript
export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();

    // Set default axios config for Sanctum SPA
    $fetch.create({
        baseURL: config.public.apiBase,
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
        },
    });
});
```

## 🎨 UI Components

### Key Components to Build:

1. **VenueCard.vue** - Display venue information
2. **CourtAvailability.vue** - Show available time slots
3. **BookingForm.vue** - Booking creation form
4. **VenueMap.vue** - Google Maps integration
5. **DateTimePicker.vue** - Date and time selection
6. **PaymentForm.vue** - Payment processing form

## 🗺️ Pages Structure

### 1. Home Page (`pages/index.vue`)

-   Hero section
-   Featured venues
-   Search functionality
-   Popular sports

### 2. Venue Listing (`pages/venues/index.vue`)

-   Search and filters
-   Map view toggle
-   Venue cards grid
-   Pagination

### 3. Venue Details (`pages/venues/[id].vue`)

-   Venue information
-   Court listing
-   Availability calendar
-   Reviews and ratings

### 4. Court Booking (`pages/courts/[id].vue`)

-   Court details
-   Time slot picker
-   Booking form
-   Payment integration

### 5. Dashboard (`pages/dashboard/index.vue`)

-   Owner dashboard
-   Booking statistics
-   Revenue charts
-   Recent activity

## 🔒 Middleware

### Auth Middleware (`middleware/auth.ts`)

```typescript
export default defineNuxtRouteMiddleware((to, from) => {
    const { isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
        return navigateTo("/auth/login");
    }
});
```

### Owner Middleware (`middleware/owner.ts`)

```typescript
export default defineNuxtRouteMiddleware((to, from) => {
    const { user } = useAuthStore();

    if (!user?.roles?.includes("owner") && !user?.roles?.includes("admin")) {
        throw createError({
            statusCode: 403,
            statusMessage: "Access Denied",
        });
    }
});
```

## 🎯 API Integration

### API Composable (`composables/useApi.ts`)

```typescript
export const useApi = () => {
    const config = useRuntimeConfig();

    const api = $fetch.create({
        baseURL: config.public.apiBase,
        credentials: "include",
    });

    return {
        // Auth
        login: (credentials: LoginCredentials) =>
            api("/auth/login", { method: "POST", body: credentials }),
        register: (data: RegisterData) =>
            api("/auth/register", { method: "POST", body: data }),
        logout: () => api("/auth/logout", { method: "POST" }),

        // Venues
        getVenues: (params?: VenueFilters) => api("/venues", { params }),
        getVenue: (id: string) => api(`/venues/${id}`),

        // Bookings
        createBooking: (data: CreateBookingData) =>
            api("/bookings", { method: "POST", body: data }),
        getMyBookings: () => api("/me/bookings"),

        // Courts
        getCourtAvailability: (courtId: string, date: string) =>
            api(`/courts/${courtId}/availability?date=${date}`),
    };
};
```

## 🚀 Getting Started

1. **Setup dependencies**:

```bash
cd booking_sport_frontend
npm install
```

2. **Configure environment**:

```bash
# .env
NUXT_PUBLIC_API_BASE=http://localhost:8000/api/v1
NUXT_PUBLIC_GOOGLE_MAPS_KEY=your_google_maps_key
```

3. **Start development**:

```bash
npm run dev
```

4. **Build for production**:

```bash
npm run build
npm run preview
```

## 📱 Mobile Responsiveness

Ensure all components are mobile-first:

-   Use Tailwind CSS responsive utilities
-   Implement touch-friendly interactions
-   Optimize for mobile performance
-   Test on various screen sizes

## 🔔 Notifications

Integrate push notifications:

-   Service worker for PWA
-   FCM integration
-   Real-time booking updates
-   Reminder notifications

---

**Next Steps**: Start with basic authentication and venue listing, then gradually add booking functionality and advanced features.
