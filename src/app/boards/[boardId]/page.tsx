import { SidebarInset } from '@/components/ui/sidebar';
import KanbanBoardClient from '@/components/kanban/kanban-board-client';

export default function BoardPage({ params }: { params: { boardId: string } }) {
  return (
    <SidebarInset>
      <KanbanBoardClient boardId={params.boardId} />
    </SidebarInset>
  );
}
