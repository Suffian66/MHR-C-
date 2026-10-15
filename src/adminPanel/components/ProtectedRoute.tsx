
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../features/authContext";

const ADMIN_EMAIL = "admin@mail.com";

const ProtectedRoute = () => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f7f6f2]">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#e87928]/20 border-t-[#e87928]" />

                    <p className="text-sm font-medium tracking-wide text-[#757676]">
                        Verifying your access...
                    </p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        );
    }

    if (user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
