import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showText = true, 
  className = '' 
}) => {
  const sizeConfig = {
    sm: {
      icon: 'w-8 h-8',
      text: 'text-lg',
      iconText: 'text-base'
    },
    md: {
      icon: 'w-10 h-10',
      text: 'text-xl',
      iconText: 'text-lg'
    },
    lg: {
      icon: 'w-12 h-12',
      text: 'text-2xl',
      iconText: 'text-xl'
    }
  };

  const config = sizeConfig[size];

  return (
    <motion.div
      className={`flex items-center gap-2 ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className={`${config.icon} bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center relative overflow-hidden`}>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <i className={`ri-community-line text-white ${config.iconText} relative z-10`}></i>
      </div>
      {showText && (
        <motion.span
          className={`${config.text} font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}
          style={{ fontFamily: '"Pacifico", serif' }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          ZynexHub
        </motion.span>
      )}
    </motion.div>
  );
};