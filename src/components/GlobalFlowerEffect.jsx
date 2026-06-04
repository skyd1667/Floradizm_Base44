import React, { useState, useEffect } from 'react';

export default function GlobalFlowerEffect() {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      const newPetals = Array.from({ length: 6 }, (_, i) => ({
        id: Date.now() + i + Math.random(),
        x: e.clientX,
        y: e.clientY,
        angle: (i * 60) + Math.random() * 30,
        emoji: ['🌸', '🌺', '✿', '❀', '🌼', '💮'][i],
      }));
      setPetals(prev => [...prev, ...newPetals]);
      setTimeout(() => setPetals(prev => prev.filter(p => !newPetals.find(n => n.id === p.id))), 700);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {petals.map(petal => (
        <span
          key={petal.id}
          className="absolute text-xs select-none"
          style={{
            left: petal.x,
            top: petal.y,
            transform: `translate(-50%, -50%)`,
            animation: `petalBurst 0.6s ease-out forwards`,
            '--angle': `${petal.angle}deg`,
          }}
        >
          {petal.emoji}
        </span>
      ))}
    </div>
  );
}
