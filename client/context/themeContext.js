import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('default');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(
      'useThemeContext must be used within a ThemeProvider'
    );
  }
  return context;
};

export { ThemeProvider, useTheme };
