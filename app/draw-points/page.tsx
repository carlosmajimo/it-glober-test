'use client'

import React, { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useHotkeys } from 'react-hotkeys-hook'
import useStickyState from '@/hooks/useStickyState';
import Menu from '@/components/Menu';

const MenuIcon = dynamic(() => import('@/components/MenuIcon'), { ssr: false });

export default function DrawPoints() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [points, setPoints] = useStickyState<Point[]>([], 'point');
  const [currentIndex, setCurrentIndex] = useStickyState<number>(0, 'currentIndex');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; 
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas.getContext('2d');
    if (context) {
      contextRef.current = context;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < currentIndex; i++) {
      const { x, y } = points[i];
      context.fillRect(x ,y, 5, 5);
    }
    
  }, [points, currentIndex]);

  const handleCanvasClick = ({ clientX, clientY }: React.MouseEvent<HTMLCanvasElement>) => {
    const context = contextRef.current;
    if (!context) return;
    
    const x = clientX - 2.5;
    const y = clientY - 2.5;
    // context.fillRect(x, y, 5, 5);
    setPoints(prev => {
      const newPoints = currentIndex < prev.length ? prev.slice(0, currentIndex) : prev

      return [...newPoints, { x, y }]
    })
    setCurrentIndex(prev => prev + 1)
  };

  const handleUndo = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context || currentIndex < 1) return;

    // context.clearRect(0, 0, canvas.width, canvas.height);

    setCurrentIndex(prev => prev - 1);
  };

  const handleRedo = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context || points.length === currentIndex) return;

    setCurrentIndex(prev => prev + 1);
  };

  const handleTrash = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context ) return;

    // context.clearRect(0, 0, canvas.width, canvas.height);
    setPoints([]);
    setCurrentIndex(0);
  }

  useHotkeys('ctrl+z', handleUndo)
  useHotkeys('ctrl+y', handleRedo)

  return (
    <main className="w-dvw h-dvh">
      <Menu>
        <MenuIcon
          iconName="undo-variant"
          onClick={handleUndo}
          disabled={currentIndex < 1}
        />
        <MenuIcon
          iconName="redo-variant"
          onClick={handleRedo}
          disabled={points.length === currentIndex}
        />
        <MenuIcon
          iconName="trash-can-outline"
          onClick={handleTrash}
          disabled={points.length === 0}
        />
      </Menu>
      <canvas
        className="w-full h-full"
        ref={canvasRef}
        onClick={handleCanvasClick}
      />
    </main>
  );
}
