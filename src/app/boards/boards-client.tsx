'use client';

import Link from 'next/link';
import { LayoutGrid } from 'lucide-react';
import Header from '@/components/layout/header';
import { useKanban } from '@/components/kanban/kanban-context';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { SidebarInset } from '.././../components/ui/sidebar';

export default function BoardsClient() {
  const { state } = useKanban();

  return (
    <SidebarInset>
      <Header title="My Boards" />
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
    </SidebarInset>
  );
}
