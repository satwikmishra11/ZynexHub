
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-12 h-6 bg-slate-200 dark:bg-slate-700 rounded-full p-1 transition-all duration-300 hover:bg-slate-300 dark:hover:bg-slate-600"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        className="w-4 h-4 bg-white dark:bg-slate-200 rounded-full shadow-md flex items-center justify-center"
        animate={{
          x: theme === 'dark' ? 24 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 30
        }}
      >
        <motion.i
          className={`text-xs ${theme === 'dark' ? 'ri-moon-fill text-blue-500' : 'ri-sun-fill text-yellow-500'}`}
          animate={{
            rotate: theme === 'dark' ? 0 : 180,
            scale: theme === 'dark' ? 1 : 1.1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
        />
      </motion.div>
    </motion.button>
  );
};
