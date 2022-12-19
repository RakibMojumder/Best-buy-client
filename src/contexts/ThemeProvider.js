import React, { createContext, useEffect, useState } from 'react';


export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(false);

    useEffect(() => {
        setTheme(JSON.parse(localStorage.getItem('Theme')));
        if (!theme) {
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
        } else {
            document.documentElement.classList.add("light");
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(!theme);

        localStorage.setItem('Theme', !theme)
    }

    return (
        <ThemeContext.Provider value={{ toggleTheme, theme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;