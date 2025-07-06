import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  onClick 
}) => {
  return (
    <motion.div
      className={`bg-white rounded-2xl shadow-soft border border-gray-100 ${hover ? 'cursor-pointer' : ''} ${className}`}
      whileHover={hover ? { 
        y: -4, 
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' 
      } : {}}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Card;