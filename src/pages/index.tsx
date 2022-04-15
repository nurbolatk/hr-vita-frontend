import React from 'react';

export function LandingRoute() {
  return (
    <div>
      <section className="relative bg-gray-50 ">
        <div
          className="absolute animate-blob top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply opacity-70"
          style={{
            filter: 'blur(1.5rem)',
          }}
        />
        <div
          className="absolute animate-blob animation-delay-2000 top-0 -right-4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply opacity-70"
          style={{
            filter: 'blur(1.5rem)',
          }}
        />
        <div
          className="absolute animate-blob animation-delay-4000 -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply opacity-70"
          style={{
            filter: 'blur(1.5rem)',
          }}
        />
      </section>
    </div>
  );
}
