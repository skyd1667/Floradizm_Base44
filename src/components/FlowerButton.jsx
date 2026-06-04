import React, { useState } from 'react';

// Flower petal burst animation on click
export default function FlowerButton({ children, className = '', onClick, type = 'button', disabled = false, as: Tag = 'button' }) {
  const [petals, setPetals] = useState([]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newPetals = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
      angle: (i * 60) + Math.random() * 30,
      emoji: ['🌸', '🌺', '✿', '❀', '🌼', '💮'][i],
    }));

    setPetals(prev => [...prev, ...newPetals]);
    setTimeout(() => setPetals(prev => prev.filter(p => !newPetals.find(n => n.id === p.id))), 700);
    if (onClick) onClick(e);
  };

  return (
    <Tag
      type={Tag === 'button' ? type : undefined}
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
      {petals.map(petal => (
        <span
          key={petal.id}
          className="pointer-events-none absolute text-xs select-none"
          style={{
            left: petal.x,
            top: petal.y,
            transform: `translate(-50%, -50%)`,
            animation: `petalBurst 0.6s ease-out forwards`,
            '--angle': `${petal.angle}deg`,
            zIndex: 50,
          }}
        >
          {petal.emoji}
        </span>
      ))}
    </Tag>
  );
}
