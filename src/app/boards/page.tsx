import { KanbanProvider } from '@/components/kanban/kanban-context';
import BoardsClient from './boards-client';

export default function BoardsPage() {
  return (
    <KanbanProvider>
      <BoardsClient />
    </KanbanProvider>
  );
}
