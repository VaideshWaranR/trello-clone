'use client';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useKanban } from './kanban-context';
import { Slider } from '@/components/ui/slider';

type AddCardDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  listId: string;
};

export default function AddCardDialog({ isOpen, onClose, listId }: AddCardDialogProps) {
  const { dispatch } = useKanban();
  const [content, setContent] = useState('');
  const [urgency, setUrgency] = useState([5]);
  const [importance, setImportance] = useState([5]);

  const handleAddCard = () => {
    if (content.trim()) {
      dispatch({
        type: 'ADD_CARD',
        payload: {
          listId,
          content: content.trim(),
          urgency: urgency[0],
          importance: importance[0],
        },
      });
      setContent('');
      setUrgency([5]);
      setImportance([5]);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new card</DialogTitle>
          <DialogDescription>
            Enter the details for your new task.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="content">Task Description</Label>
            <Textarea
              id="content"
              placeholder="e.g., Finalize the project report"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="urgency">Urgency: {urgency[0]}</Label>
            <Slider
              id="urgency"
              min={1}
              max={10}
              step={1}
              value={urgency}
              onValueChange={setUrgency}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="importance">Importance: {importance[0]}</Label>
            <Slider
              id="importance"
              min={1}
              max={10}
              step={1}
              value={importance}
              onValueChange={setImportance}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleAddCard}>Add Card</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
