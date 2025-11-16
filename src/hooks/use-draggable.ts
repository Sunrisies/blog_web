'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface DragConstraints {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}

interface UseDraggableProps {
  initialPosition?: { x: number; y: number };
  constraints?: DragConstraints;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  snapToEdge?: boolean;
  snapThreshold?: number;
}

interface UseDraggableReturn {
  position: { x: number; y: number };
  isDragging: boolean;
  dragRef: React.RefObject<HTMLDivElement>;
  handleMouseDown: (e: React.MouseEvent) => void;
  resetPosition: () => void;
}

export function useDraggable({
  initialPosition = { x: 0, y: 0 },
  constraints = {},
  onDragStart,
  onDragEnd,
  snapToEdge = false,
  snapThreshold = 50
}: UseDraggableProps = {}): UseDraggableReturn {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const dragRef = useRef<HTMLDivElement>(null);

  const getConstraints = useCallback(() => {
    if (!dragRef.current || typeof window === 'undefined') return constraints;

    const element = dragRef.current;
    const rect = element.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    return {
      left: constraints.left ?? 0,
      right: constraints.right ?? (viewportWidth - rect.width),
      top: constraints.top ?? 0,
      bottom: constraints.bottom ?? (viewportHeight - rect.height)
    };
  }, [constraints]);

  const constrainPosition = useCallback((x: number, y: number) => {
    const constraints = getConstraints();
    
    return {
      x: Math.max(constraints.left!, Math.min(constraints.right!, x)),
      y: Math.max(constraints.top!, Math.min(constraints.bottom!, y))
    };
  }, [getConstraints]);

  const snapToNearestEdge = useCallback((x: number, y: number) => {
    if (!snapToEdge || typeof window === 'undefined') return { x, y };

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    if (!dragRef.current) return { x, y };
    
    const element = dragRef.current;
    const rect = element.getBoundingClientRect();

    let snappedX = x;
    let snappedY = y;

    // Snap to horizontal edges
    if (x < snapThreshold) {
      snappedX = 0;
    } else if (x + rect.width > viewportWidth - snapThreshold) {
      snappedX = viewportWidth - rect.width;
    }

    // Snap to vertical edges
    if (y < snapThreshold) {
      snappedY = 0;
    } else if (y + rect.height > viewportHeight - snapThreshold) {
      snappedY = viewportHeight - rect.height;
    }

    return { x: snappedX, y: snappedY };
  }, [snapToEdge, snapThreshold]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    
    onDragStart?.();
  }, [position, onDragStart]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    const constrained = constrainPosition(newX, newY);
    setPosition(constrained);
  }, [isDragging, dragStart, constrainPosition]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);
    
    // Apply snap to edge if enabled
    setPosition(prev => snapToNearestEdge(prev.x, prev.y));
    
    onDragEnd?.();
  }, [isDragging, snapToNearestEdge, onDragEnd]);

  const resetPosition = useCallback(() => {
    setPosition(initialPosition);
  }, [initialPosition]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return {
    position,
    isDragging,
    dragRef,
    handleMouseDown,
    resetPosition
  };
}