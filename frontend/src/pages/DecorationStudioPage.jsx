import React from 'react';
import { CanvasStudio } from '../components/editor/CanvasStudio';

export const DecorationStudioPage = () => {
  return (
    <div className="w-full h-full min-h-screen bg-midnight-950 overflow-hidden">
      <CanvasStudio />
    </div>
  );
};
