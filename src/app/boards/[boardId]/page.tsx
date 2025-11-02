import { KanbanProvider } from '@/components/kanban/kanban-context';
import KanbanBoardClient from '@/components/kanban/kanban-board-client';

export default function BoardPage({ params }: { params: { boardId: string } }) {
  return (
    <KanbanProvider>
      <KanbanBoardClient boardId={params.boardId} />
    </KanbanProvider>
  );
}
