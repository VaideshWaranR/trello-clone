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
        "cursor-grab active:cursor-grabbing transition-opacity",
        isDragged && "opacity-30",
        isHighlighted && "ring-2 ring-offset-2 ring-green-500 shadow-lg"
      )}
    >
      <CardContent className="p-3">
        <p className="text-sm mb-3">{card.content}</p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Flame className="h-3 w-3 text-red-500" />
            <span>Urgency: {card.urgency}</span>
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Star className="h-3 w-3 text-yellow-500" />
            <span>Importance: {card.importance}</span>
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
