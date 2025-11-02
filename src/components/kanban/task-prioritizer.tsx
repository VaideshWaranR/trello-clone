'use client';

import { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/types/kanban';
import { prioritizeTask, TaskPrioritizationInput } from '@/ai/flows/task-prioritization';
import { useToast } from '@/hooks/use-toast';
import { Spinner } from '../ui/spinner';

type TaskPrioritizerProps = {
  cards: Card[];
  setHighlightedCardId: (id: string | null) => void;
};

export default function TaskPrioritizer({ cards, setHighlightedCardId }: TaskPrioritizerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSuggestTask = async () => {
    if (cards.length === 0) {
      toast({
        title: 'No tasks to prioritize',
        description: 'Add some tasks to your board first.',
      });
      return;
    }
    
    setIsLoading(true);
    setHighlightedCardId(null);
    
    try {
      const taskInput: TaskPrioritizationInput = {
        tasks: cards.map(card => ({
          id: card.id,
          description: card.content,
          urgency: card.urgency,
          importance: card.importance,
        })),
      };

      const result = await prioritizeTask(taskInput);
      
      if (result?.suggestedTask?.id) {
        setHighlightedCardId(result.suggestedTask.id);
        toast({
          title: 'Task Suggestion',
          description: result.suggestedTask.reason,
        });
      } else {
        throw new Error("AI couldn't determine a task.");
      }

    } catch (error) {
      console.error('Error prioritizing task:', error);
      toast({
        variant: 'destructive',
        title: 'Prioritization Failed',
        description: 'Could not get a task suggestion from the AI.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleSuggestTask} disabled={isLoading}>
      {isLoading ? (
        <>
          <Spinner size="sm" className="mr-2" />
          Thinking...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Suggest Task
        </>
      )}
    </Button>
  );
}
