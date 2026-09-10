import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

interface Card3DTiltProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export const Card3DTilt: React.FC<Card3DTiltProps> = ({
  children,
  className = '',
  glowColor = 'rgba(56, 189, 248, 0.15)',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rY = ((x - centerX) / centerX) * 12; // tilt y
    const rX = -((y - centerY) / centerY) * 12; // tilt x

    setRotateX(rX);
    setRotateY(rY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`relative group rounded-2xl transition-shadow duration-300 ${className}`}
    >
      {/* Dynamic Backing Glow */}
      <div
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"
        style={{ background: glowColor }}
      />

      {/* Glass Glare Overlay */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none z-20 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
          opacity: glarePos.opacity,
        }}
      />

      {/* Card Content Container */}
      <div className="relative z-10 h-full w-full">{children}</div>
    </motion.div>
  );
};
