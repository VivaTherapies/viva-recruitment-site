import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useMemo } from 'react';
const ThemeContext = createContext(undefined);
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('system');
    const contextValue = useMemo(() => ({
        theme,
        setTheme,
    }), [theme]);
    return (_jsx(ThemeContext.Provider, { value: contextValue, children: children }));
};
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
