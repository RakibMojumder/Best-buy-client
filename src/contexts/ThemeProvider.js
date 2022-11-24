import React, { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(true);

    useEffect(() => {
        if (theme) {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
        } else {
            document.documentElement.classList.add('light');
            document.documentElement.classList.remove('dark');
        }

        const storedTheme = JSON.parse(localStorage.getItem('Theme'))
        setTheme(storedTheme);

    }, [theme])
    const toggleTheme = () => {
        setTheme(!theme);
        localStorage.setItem('Theme', !theme)
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;