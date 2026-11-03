import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Portfolio from "./pages/Portfolio";
import AboutUs from "./pages/About";
import ServicePage from "./pages/Services";
import Blog from "./pages/Blog";
import AdminDashboard from "./adminPanel/pages/AdminDashboard";
import Page from "./adminPanel/pages/Page";
import Media from "./adminPanel/pages/Media";
import AddContent from "./adminPanel/pages/AddContent";
import Login from "./adminPanel/pages/login";
import ProtectedRoute from "./adminPanel/components/ProtectedRoute";
import { AuthProvider } from "./adminPanel/features/authContext";
import AdminBlogPage from "./adminPanel/pages/BlogForm";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <ToastContainer />

                <Routes>
                    {/* Public website routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/services/:slug" element={<ServicePage />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<Blog />} />

                    {/* Public login route */}
                    <Route path="/login" element={<Login />} />

                    {/* Protected admin routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route
                            path="/admin/dashboard"
                            element={<AdminDashboard />}
                        />

                        <Route
                            path="/admin/pages"
                            element={<Page />}
                        />

                        <Route
                            path="/admin/blogs"
                            element={<AdminBlogPage />}
                        />

                        <Route
                            path="/admin/media"
                            element={<Media />}
                        />

                        {/* <Route
                            path="/admin/add-content"
                            element={<AddContent />}
                        /> */}
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
