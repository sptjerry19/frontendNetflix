import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import VenueList from "../views/venues/VenueList.vue";
import VenueDetail from "../views/venues/VenueDetail.vue";
import Login from "../views/auth/Login.vue";
import authMiddleware from "../middleware/auth";
import ownerMiddleware from "../middleware/owner";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Public routes
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/venues",
      name: "VenueList",
      component: VenueList,
    },
    {
      path: "/venues/:id",
      name: "VenueDetail",
      component: VenueDetail,
    },

    // Auth routes
    {
      path: "/auth/login",
      name: "Login",
      component: Login,
      meta: { guest: true },
    },
    {
      path: "/auth/register",
      name: "Register",
      component: () => import("../views/auth/Register.vue"),
      meta: { guest: true },
    },

    // Protected routes (require authentication)
    {
      path: "/booking/:courtId",
      name: "CourtBooking",
      component: () => import("../views/booking/CourtBooking.vue"),
      beforeEnter: authMiddleware,
    },
    {
      path: "/bookings",
      name: "MyBookings",
      component: () => import("../views/booking/MyBookings.vue"),
      beforeEnter: authMiddleware,
    },
    {
      path: "/bookings/:id",
      name: "BookingDetail",
      component: () => import("../views/booking/BookingDetail.vue"),
      beforeEnter: authMiddleware,
    },
    {
      path: "/profile",
      name: "Profile",
      component: () => import("../views/auth/Profile.vue"),
      beforeEnter: authMiddleware,
    },

    // Owner dashboard routes (require owner role)
    {
      path: "/dashboard",
      name: "OwnerDashboard",
      component: () => import("../views/dashboard/OwnerDashboard.vue"),
      beforeEnter: ownerMiddleware,
    },
    {
      path: "/dashboard/venues",
      name: "ManageVenues",
      component: () => import("../views/dashboard/ManageVenues.vue"),
      beforeEnter: ownerMiddleware,
    },
    {
      path: "/dashboard/venues/create",
      name: "CreateVenue",
      component: () => import("../views/dashboard/CreateVenue.vue"),
      beforeEnter: ownerMiddleware,
    },
    {
      path: "/dashboard/venues/:id/edit",
      name: "EditVenue",
      component: () => import("../views/dashboard/EditVenue.vue"),
      beforeEnter: ownerMiddleware,
    },
    {
      path: "/dashboard/bookings",
      name: "ManageBookings",
      component: () => import("../views/dashboard/ManageBookings.vue"),
      beforeEnter: ownerMiddleware,
    },

    // Catch-all 404 route
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("../views/NotFound.vue"),
    },
  ],
});

export default router;
