import KanbanBoardClient from '@/components/kanban/kanban-board-client';

export default function BoardPage({ params }: { params: { boardId: string } }) {
  return (
    <KanbanBoardClient boardId={params.boardId} />
  );
}
