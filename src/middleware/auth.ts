import { useAuth } from "@/composables/useAuth";

export default function authMiddleware(to: any, from: any, next: any) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated.value) {
    // Redirect to login page if not authenticated
    next("/auth/login");
  } else {
    next();
  }
}
