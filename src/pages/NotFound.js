import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "wouter";
export default function NotFound() {
    return (_jsxs("div", { className: "min-h-screen flex flex-col items-center justify-center bg-gray-100", children: [_jsx("h1", { className: "text-6xl font-bold text-gray-800 mb-4", children: "404" }), _jsx("p", { className: "text-xl text-gray-600 mb-8", children: "Page Not Found" }), _jsx(Link, { href: "/", children: _jsx("a", { className: "px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors", children: "Go to Home" }) })] }));
}
