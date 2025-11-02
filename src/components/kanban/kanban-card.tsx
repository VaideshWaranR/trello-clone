'use client';
import { useEffect } from 'react';
import { Card as CardType } from '@/types/kanban';
import { Card, CardContent } from '@/components/ui/card';
import { Flame, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

type KanbanCardProps = {
  card: CardType;
  listId: string;
  isDragged: boolean;
  isHighlighted: boolean;
  clearHighlight: () => void;
  onDragStart: (cardId: string, sourceListId: string) => void;
};

export default function KanbanCard({ card, listId, isDragged, isHighlighted, clearHighlight, onDragStart }: KanbanCardProps) {
  
  useEffect(() => {
    if (isHighlighted) {
      const timer = setTimeout(() => {
        clearHighlight();
      }, 5000); // Highlight for 5 seconds
      return () => clearTimeout(timer);
    }
  }, [isHighlighted, clearHighlight]);
  
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    onDragStart(card.id, listId);
  };

  return (
    <Card
      draggable
      onDragStart={handleDragStart}
      className={cn(
        "cursor-grab active:cursor-grabbing transition-all duration-200 ease-in-out hover:shadow-xl hover:-translate-y-1",
        isDragged && "opacity-30 scale-95",
        isHighlighted && "ring-2 ring-offset-2 ring-green-500 shadow-2xl scale-105"
      )}
    >
      <CardContent className="p-4">
        <p className="text-base mb-4 font-medium">{card.content}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="outline" className="flex items-center gap-1.5 py-1 px-2 border-red-500/50 bg-red-500/10 text-red-700 dark:text-red-400">
            <Flame className="h-3.5 w-3.5" />
            <span className="font-semibold">Urgency: {card.urgency}</span>
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1.5 py-1 px-2 border-yellow-500/50 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400">
            <Star className="h-3.5 w-3.5" />
            <span className="font-semibold">Importance: {card.importance}</span>
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
