import React, { useState, useEffect } from 'react';

/**
 * Interface for the mouse position state.
 */
interface MousePosition {
  x: number;
  y: number;
}

/**
 * A custom hook to track the mouse position.
 * @returns The current mouse position { x, y }.
 */
const useMousePosition = (): MousePosition => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return mousePosition;
};


/**
 * The main application component.
 * Renders a playful greeting with a dynamic, mouse-following gradient background effect.
 */
const App: React.FC = () => {
  const { x, y } = useMousePosition();

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center bg-slate-900 text-white overflow-hidden px-4">
      {/* The gradient mouse follower */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition duration-300"
        style={{
          background: `radial-gradient(400px at ${x}px ${y}px, rgba(29, 78, 216, 0.25), transparent 80%)`,
        }}
      />
      
      {/* The main content */}
      <div className="relative z-10 flex flex-col items-center">
        <h1 
          className="text-7xl sm:text-8xl md:text-9xl font-extrabold tracking-tighter text-center"
          style={{
            textShadow: '0 0 10px rgba(255,255,255,0.1), 0 0 20px rgba(255,255,255,0.1)'
          }}
        >
          <span className="bg-gradient-to-r from-fuchsia-500 via-red-500 to-orange-400 bg-clip-text text-transparent">
            Hello, Henry
          </span>
        </h1>
        <p className="mt-4 text-slate-400 text-lg">
          This is your cool landing page.
        </p>
      </div>
    </main>
  );
};

export default App;
