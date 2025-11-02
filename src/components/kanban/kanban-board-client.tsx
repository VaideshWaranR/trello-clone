'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/header';
import { useKanban } from '@/components/kanban/kanban-context';
import { Spinner } from '@/components/ui/spinner';
import KanbanList from './kanban-list';
import AddListForm from './add-list-form';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import TaskPrioritizer from './task-prioritizer';
import { Card } from '@/types/kanban';

export default function KanbanBoardClient({ boardId }: { boardId: string }) {
  const { state, dispatch } = useKanban();
  const router = useRouter();
  const [highlightedCardId, setHighlightedCardId] = useState<string | null>(null);

  const [draggedItem, setDraggedItem] = useState<{cardId: string, sourceListId: string} | null>(null);

  const board = state.boards.find(b => b.id === boardId);

  useEffect(() => {
    if (board) {
      dispatch({ type: 'SET_ACTIVE_BOARD', payload: boardId });
    }
  }, [boardId, dispatch, board]);


  if (!board) {
    // This can happen if the data is not loaded yet or the boardId is invalid.
    // In a real-world app, you might fetch data here or show a 404 page.
    // For this mock setup, if the board isn't in the state, it might be a new board
    // that hasn't been persisted and reloaded yet. We'll show a spinner briefly.
    // A better approach for new boards would be to ensure state is consistent across pages.
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const allCards: Card[] = board.lists.flatMap(list => list.cards.map(card => ({...card, listId: list.id})));

  const handleDragStart = (cardId: string, sourceListId: string) => {
    setDraggedItem({ cardId, sourceListId });
  };

  const handleDrop = (destListId: string, destIndex: number) => {
    if (draggedItem) {
      dispatch({
        type: 'MOVE_CARD',
        payload: { ...draggedItem, destListId, destIndex },
      });
      setDraggedItem(null);
    }
  };

  return (
    <>
      <Header title={board.name}>
        <TaskPrioritizer cards={allCards} setHighlightedCardId={setHighlightedCardId} />
      </Header>
      <main className="flex-1 overflow-x-auto">
        <ScrollArea className="w-full h-[calc(100vh-4rem)] whitespace-nowrap">
            <div className="inline-flex h-full gap-6 p-6">
            {board.lists.map(list => (
                <KanbanList
                key={list.id}
                list={list}
                onDragStart={handleDragStart}
                onDrop={handleDrop}
                draggedCardId={draggedItem?.cardId ?? null}
                highlightedCardId={highlightedCardId}
                clearHighlight={() => setHighlightedCardId(null)}
                />
            ))}
            <AddListForm boardId={board.id} />
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </main>
    </>
  );
}
