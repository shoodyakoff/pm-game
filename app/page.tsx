'use client';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { StrictMode } from 'react';
import Game from './components/game/Game';

export default function Home() {
  return (
    <StrictMode>
      <DndProvider backend={HTML5Backend}>
        <div className="min-h-screen bg-gray-900 text-white">
          <main className="container mx-auto px-4">
            <Game />
          </main>
        </div>
      </DndProvider>
    </StrictMode>
  );
}