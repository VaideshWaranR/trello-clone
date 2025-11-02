'use client';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { List } from '@/types/kanban';
import KanbanCard from './kanban-card';
import { Button } from '@/components/ui/button';
import AddCardDialog from './add-card-dialog';
import { cn } from '@/lib/utils';

type KanbanListProps = {
  list: List;
  onDragStart: (cardId: string, sourceListId: string) => void;
  onDrop: (destListId: string, destIndex: number) => void;
  draggedCardId: string | null;
  highlightedCardId: string | null;
  clearHighlight: () => void;
};

export default function KanbanList({ list, onDragStart, onDrop, draggedCardId, highlightedCardId, clearHighlight }: KanbanListProps) {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    // A simple way to determine drop index. Could be more precise.
    onDrop(list.id, list.cards.length); 
  };
  
  return (
    <div
      className={cn(
        "flex w-80 flex-col rounded-lg bg-card/60 shadow-sm transition-colors",
        isDragOver && "bg-primary/10"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between p-3 border-b">
        <h2 className="font-semibold">{list.title}</h2>
        <span className="text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
            {list.cards.length}
        </span>
      </div>
      <div className="flex-1 space-y-3 p-3 overflow-y-auto">
        {list.cards.map(card => (
          <KanbanCard
            key={card.id}
            card={card}
            listId={list.id}
            isDragged={draggedCardId === card.id}
            isHighlighted={highlightedCardId === card.id}
            clearHighlight={clearHighlight}
            onDragStart={onDragStart}
          />
        ))}
      </div>
      <div className="p-3 mt-auto">
        <Button variant="ghost" className="w-full justify-start" onClick={() => setIsAddingCard(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add a card
        </Button>
      </div>
      <AddCardDialog
        isOpen={isAddingCard}
        onClose={() => setIsAddingCard(false)}
        listId={list.id}
      />
    </div>
  );
}
