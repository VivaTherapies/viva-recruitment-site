import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Component } from "react";
class ErrorBoundary extends Component {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "state", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                hasError: false
            }
        });
    }
    static getDerivedStateFromError(_) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return (_jsxs("div", { className: "min-h-screen flex flex-col items-center justify-center bg-red-100 text-red-800", children: [_jsx("h1", { className: "text-4xl font-bold mb-4", children: "Something went wrong." }), _jsx("p", { className: "text-lg", children: "Please try refreshing the page or contact support." })] }));
        }
        return this.props.children;
    }
}
export default ErrorBoundary;
