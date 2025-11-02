'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Plus, LayoutGrid } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { useKanban } from '@/components/kanban/kanban-context';
import Logo from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
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

export default function AppSidebar() {
  const { state, dispatch } = useKanban();
  const pathname = usePathname();
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
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
                <Button variant="outline" className="w-full" onClick={() => setIsDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Board
                </Button>
            </SidebarMenuItem>
            <SidebarMenuItem className="mt-4">
              <span className="text-xs font-semibold text-muted-foreground px-2">All Boards</span>
            </SidebarMenuItem>
            {state.boards.map(board => (
              <SidebarMenuItem key={board.id}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === `/boards/${board.id}`}
                  tooltip={board.name}
                >
                  <Link href={`/boards/${board.id}`}>
                    <LayoutGrid />
                    <span>{board.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            {/* Can add footer content here */}
        </SidebarFooter>
      </Sidebar>

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
