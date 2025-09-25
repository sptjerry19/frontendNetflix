import { useAuth } from "@/composables/useAuth";

export default function ownerMiddleware(to: any, from: any, next: any) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated.value) {
    // Redirect to login if not authenticated
    next("/auth/login");
    return;
  }

  if (
    !user.value?.roles?.includes("owner") &&
    !user.value?.roles?.includes("admin")
  ) {
    // Redirect to home if not owner or admin
    next({
      path: "/",
      query: {
        error: "access_denied",
        message: "Bạn không có quyền truy cập trang này",
      },
    });
    return;
  }

  next();
}
