'use client';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { List } from '@/types/kanban';
import KanbanCard from './kanban-card';
import { Button } from '@/components/ui/button';
import AddCardDialog from './add-card-dialog';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

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
    onDrop(list.id, list.cards.length); 
  };
  
  return (
    <div
      className={cn(
        "flex h-full w-80 flex-col rounded-xl bg-secondary/50",
      )}
    >
      <div className="flex items-center justify-between p-4 border-b-2 border-primary/10">
        <h2 className="font-bold text-lg tracking-tight">{list.title}</h2>
        <span className="text-sm font-bold text-muted-foreground bg-primary/10 px-2.5 py-1 rounded-full">
            {list.cards.length}
        </span>
      </div>
      <ScrollArea 
        className="flex-1"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className={cn("flex flex-col gap-4 p-4 transition-colors", isDragOver && "bg-primary/10")}>
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
      </ScrollArea>
      <div className="p-4 mt-auto border-t-2 border-primary/10">
        <Button variant="ghost" className="w-full justify-center" onClick={() => setIsAddingCard(true)}>
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
