'use client';
import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useKanban } from './kanban-context';
import { Card, CardContent } from '@/components/ui/card';

type AddListFormProps = {
  boardId: string;
};

export default function AddListForm({ boardId }: AddListFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const { dispatch } = useKanban();

  const handleAddList = () => {
    if (title.trim()) {
      dispatch({ type: 'ADD_LIST', payload: { boardId, title: title.trim() } });
      setTitle('');
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="w-80 flex-shrink-0">
        <Card className="bg-secondary/50 p-2">
          <CardContent className="p-2 space-y-2">
            <Input
              placeholder="Enter list title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleAddList()}
            />
            <div className="flex items-center gap-2">
              <Button onClick={handleAddList}>Add List</Button>
              <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-80 flex-shrink-0">
      <Button
        variant="ghost"
        className="w-full h-16 bg-primary/5 hover:bg-primary/10 text-primary-foreground dark:text-primary rounded-xl"
        onClick={() => setIsEditing(true)}
      >
        <Plus className="mr-2 h-5 w-5" />
        <span className="font-semibold text-lg">Add another list</span>
      </Button>
    </div>
  );
}
