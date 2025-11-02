export interface Card {
  id: string;
  content: string;
  listId: string;
  urgency: number;
  importance: number;
}

export interface List {
  id: string;
  title: string;
  cards: Card[];
}

export interface Board {
  id: string;
  name: string;
  lists: List[];
}

export interface KanbanState {
  boards: Board[];
  activeBoardId: string | null;
}
