import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    ArrowRight,
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    ShieldCheck,
} from "lucide-react";
import { auth } from "../service/firebase";


const ADMIN_EMAIL = "admin@mail.com";

type LoginFormData = {
    email: string;
    password: string;
};

const schema = Yup.object({
    email: Yup.string()
        .email("Please enter a valid email address")
        .required("Email address is required"),
    password: Yup.string()
        .min(6, "Password must contain at least 6 characters")
        .required("Password is required"),
});

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        setIsSubmitting(true);

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                data.email.trim(),
                data.password
            );

            if (
                userCredential.user.email?.toLowerCase() !==
                ADMIN_EMAIL.toLowerCase()
            ) {
                await signOut(auth);
                toast.error("Access denied. This account is not an administrator.");
                return;
            }

            toast.success("Welcome back! Login successful.");
            navigate("/admin/dashboard", { replace: true });
        } catch (error: unknown) {
            if (
                typeof error === "object" &&
                error !== null &&
                "code" in error
            ) {
                const errorCode = String(error.code);

                if (
                    errorCode === "auth/invalid-credential" ||
                    errorCode === "auth/wrong-password" ||
                    errorCode === "auth/user-not-found"
                ) {
                    toast.error("Incorrect email or password.");
                } else if (errorCode === "auth/too-many-requests") {
                    toast.error(
                        "Too many attempts. Please try again later."
                    );
                } else {
                    toast.error("Unable to sign in. Please try again.");
                    console.error("Firebase login error:", error);
                }
            } else {
                toast.error("An unexpected error occurred.");
                console.error("Unknown login error:", error);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen w-full overflow-hidden bg-white">
            <div className="grid min-h-screen w-full grid-cols-1 overflow-hidden bg-white lg:grid-cols-[1.12fr_0.88fr]">
                {/* LEFT — Image and branding */}
                <section className="relative isolate flex min-h-[300px] flex-col justify-between overflow-hidden bg-[#252525] p-7 text-white sm:min-h-[350px] sm:p-10 lg:min-h-[690px] lg:p-14">

                    {/* Background image */}
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 -z-20 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85')",
                        }}
                    />

                    {/* Dark overlay */}
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 bg-gradient-to-br from-black/80 via-black/60 to-[#e87928]/55"
                    />

                    {/* Subtle orange accent */}
                    <div
                        aria-hidden="true"
                        className="absolute -right-24 top-20 -z-10 h-72 w-72 rounded-full border border-white/20 sm:h-96 sm:w-96"
                    />
                    <div
                        aria-hidden="true"
                        className="absolute -right-12 top-32 -z-10 h-52 w-52 rounded-full border border-[#e87928]/60 sm:h-72 sm:w-72"
                    />

                    {/* Branding */}
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e87928] text-xl font-bold tracking-tight text-white shadow-lg">
                                MH
                            </div>

                            <div>
                                <p className="text-sm font-bold uppercase tracking-[0.18em]">
                                    MHR
                                </p>
                                <p className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-white/70 sm:text-xs">
                                    Renovations & Contracting
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Welcome message */}
                    <div className="relative z-10 my-12 max-w-xl lg:my-0 lg:py-16">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium tracking-wide text-white/90 backdrop-blur-sm">
                            <span className="h-2 w-2 rounded-full bg-[#e87928]" />
                            ADMINISTRATION PORTAL
                        </div>

                        <h1 className="text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
                            Welcome
                            <br />
                            <span className="text-[#e87928]">back.</span>
                        </h1>

                        <p className="mt-6 max-w-md text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
                            Manage your website content, renovation
                            projects, services, and everything that
                            brings your brand to life.
                        </p>

                        <div className="mt-8 h-1 w-16 rounded-full bg-[#e87928]" />
                    </div>

                    {/* Footer */}
                    <div className="relative z-10 flex items-center justify-between gap-4 border-t border-white/20 pt-5 text-xs text-white/60">
                        <span>© {new Date().getFullYear()} MHR</span>
                        <span className="flex items-center gap-2">
                            <ShieldCheck size={15} />
                            Authorized access only
                        </span>
                    </div>
                </section>

                {/* RIGHT — Login form */}
                <section className="flex items-center justify-center bg-white px-6 py-10 sm:px-12 sm:py-14 lg:px-14 lg:py-16 xl:px-20">
                    <div className="w-full max-w-[390px]">

                        {/* Form heading */}
                        <div className="mb-9">
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#e87928]/10 text-[#e87928]">
                                <LockKeyhole size={23} />
                            </div>

                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e87928]">
                                Secure sign in
                            </p>

                            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-black sm:text-4xl">
                                Sign in to MHR
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-[#757676]">
                                Enter your administrator credentials
                                to access your dashboard.
                            </p>
                        </div>

                        {/* Login form */}
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-5"
                        >
                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-semibold text-[#292929]"
                                >
                                    Email address
                                </label>

                                <div
                                    className={`flex items - center rounded - xl border bg - white transition - all ${errors.email
                                        ? "border-red-400"
                                        : "border-[#e5e5e5] focus-within:border-[#e87928] focus-within:ring-4 focus-within:ring-[#e87928]/10"
                                        } `}
                                >
                                    <Mail
                                        size={18}
                                        className="ml-4 shrink-0 text-[#929292]"
                                    />

                                    <input
                                        id="email"
                                        type="email"
                                        autoComplete="username"
                                        placeholder="admin@mail.com"
                                        {...register("email")}
                                        className="w-full rounded-xl bg-transparent px-3 py-3.5 text-sm text-black outline-none placeholder:text-[#a5a5a5]"
                                    />
                                </div>

                                {errors.email && (
                                    <p className="mt-2 text-xs text-red-500">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-semibold text-[#292929]"
                                >
                                    Password
                                </label>

                                <div
                                    className={`flex items - center rounded - xl border bg - white transition - all ${errors.password
                                        ? "border-red-400"
                                        : "border-[#e5e5e5] focus-within:border-[#e87928] focus-within:ring-4 focus-within:ring-[#e87928]/10"
                                        } `}
                                >
                                    <LockKeyhole
                                        size={18}
                                        className="ml-4 shrink-0 text-[#929292]"
                                    />

                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        placeholder="Enter your password"
                                        {...register("password")}
                                        className="w-full min-w-0 bg-transparent px-3 py-3.5 text-sm text-black outline-none placeholder:text-[#a5a5a5]"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword((current) => !current)
                                        }
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                        className="mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#757676] transition hover:bg-[#f4f4f4] hover:text-black"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}
                                    </button>
                                </div>

                                {errors.password && (
                                    <p className="mt-2 text-xs text-red-500">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group mt-3 flex w-full items-center justify-center gap-3 rounded-xl bg-[#e87928] px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-[#e87928]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d66b20] hover:shadow-xl hover:shadow-[#e87928]/25 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                        Signing you in...
                                    </>
                                ) : (
                                    <>
                                        Sign In to Dashboard
                                        <ArrowRight
                                            size={18}
                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                        />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Security note */}
                        <div className="mt-8 flex items-start gap-3 rounded-xl border border-[#eeeeee] bg-[#fafafa] p-4">
                            <ShieldCheck
                                size={19}
                                className="mt-0.5 shrink-0 text-[#e87928]"
                            />
                            <p className="text-xs leading-5 text-[#757676]">
                                This portal is restricted to authorized
                                administrators. Your credentials are
                                processed securely through Firebase
                                Authentication.
                            </p>
                        </div>

                        <p className="mt-8 text-center text-xs text-[#929292]">
                            MHR Renovations & Contractors
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Login;