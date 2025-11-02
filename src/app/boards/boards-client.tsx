'use client';

import Link from 'next/link';
import { LayoutGrid, Plus } from 'lucide-react';
import Header from '@/components/layout/header';
import { useKanban } from '@/components/kanban/kanban-context';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function BoardsClient() {
  const { state, dispatch } = useKanban();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');

  const handleCreateBoard = () => {
    if (newBoardName.trim()) {
      dispatch({ type: 'ADD_BOARD', payload: { name: newBoardName.trim() } });
      setNewBoardName('');
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <Header title="My Boards">
        <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Board
        </Button>
      </Header>
      <main className="flex-1 p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {state.boards.map(board => (
            <Link href={`/boards/${board.id}`} key={board.id}>
              <Card className="flex min-h-[150px] flex-col justify-between transition-all hover:shadow-md hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LayoutGrid className="h-5 w-5 text-primary" />
                    <span>{board.name}</span>
                  </CardTitle>
                  <CardDescription>
                    {board.lists.length} lists,{' '}
                    {board.lists.reduce((acc, list) => acc + list.cards.length, 0)} cards
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new board</DialogTitle>
            <DialogDescription>
              Give your new board a name to get started.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newBoardName}
                onChange={e => setNewBoardName(e.target.value)}
                className="col-span-3"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && handleCreateBoard()}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateBoard}>Create Board</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
