'use client';

import {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
  Dispatch,
} from 'react';
import { Board, Card, List, KanbanState } from '@/types/kanban';

type KanbanAction =
  | { type: 'SET_STATE'; payload: KanbanState }
  | { type: 'ADD_BOARD'; payload: { name: string } }
  | { type: 'SET_ACTIVE_BOARD'; payload: string }
  | { type: 'ADD_LIST'; payload: { boardId: string; title: string } }
  | { type: 'ADD_CARD'; payload: { listId: string; content: string; urgency: number; importance: number } }
  | { type: 'MOVE_CARD'; payload: { cardId: string; sourceListId: string; destListId: string; destIndex: number }};

interface KanbanContextType {
  state: KanbanState;
  dispatch: Dispatch<KanbanAction>;
}

const KanbanContext = createContext<KanbanContextType | undefined>(undefined);

const initialData: KanbanState = {
  boards: [
    {
      id: 'board-1',
      name: 'My First Project',
      lists: [
        {
          id: 'list-1',
          title: 'To Do',
          cards: [
            { id: 'card-1', content: 'Set up project structure', urgency: 8, importance: 9 },
            { id: 'card-2', content: 'Design the UI', urgency: 7, importance: 8 },
          ],
        },
        {
          id: 'list-2',
          title: 'In Progress',
          cards: [
            { id: 'card-3', content: 'Develop authentication', urgency: 9, importance: 9 },
          ],
        },
        {
          id: 'list-3',
          title: 'Done',
          cards: [],
        },
      ],
    },
  ],
  activeBoardId: 'board-1',
};

const kanbanReducer = (state: KanbanState, action: KanbanAction): KanbanState => {
  switch (action.type) {
    case 'SET_STATE':
      return action.payload;

    case 'ADD_BOARD': {
      const newBoard: Board = {
        id: `board-${Date.now()}`,
        name: action.payload.name,
        lists: [
          { id: 'list-1', title: 'To Do', cards: [] },
          { id: 'list-2', title: 'In Progress', cards: [] },
          { id: 'list-3', title: 'Done', cards: [] },
        ],
      };
      return { ...state, boards: [...state.boards, newBoard] };
    }

    case 'SET_ACTIVE_BOARD':
      return { ...state, activeBoardId: action.payload };

    case 'ADD_LIST': {
      const { boardId, title } = action.payload;
      const newList: List = { id: `list-${Date.now()}`, title, cards: [] };
      return {
        ...state,
        boards: state.boards.map(board =>
          board.id === boardId
            ? { ...board, lists: [...board.lists, newList] }
            : board
        ),
      };
    }
    
    case 'ADD_CARD': {
        const { listId, content, urgency, importance } = action.payload;
        const newCard: Card = { id: `card-${Date.now()}`, content, listId, urgency, importance };
        return {
          ...state,
          boards: state.boards.map(board => ({
            ...board,
            lists: board.lists.map(list =>
              list.id === listId
                ? { ...list, cards: [...list.cards, newCard] }
                : list
            ),
          })),
        };
    }

    case 'MOVE_CARD': {
        const { cardId, sourceListId, destListId, destIndex } = action.payload;
        
        const activeBoard = state.boards.find(b => b.id === state.activeBoardId);
        if (!activeBoard) return state;

        let cardToMove: Card | undefined;
        const sourceList = activeBoard.lists.find(l => l.id === sourceListId);
        if (sourceList) {
            cardToMove = sourceList.cards.find(c => c.id === cardId);
        }

        if (!cardToMove) return state;
        
        const newCard = { ...cardToMove, listId: destListId };

        const newBoards = state.boards.map(board => {
            if (board.id !== state.activeBoardId) return board;

            const newLists = board.lists.map(list => {
                // Remove from source list
                if (list.id === sourceListId) {
                    return { ...list, cards: list.cards.filter(c => c.id !== cardId) };
                }
                // Add to destination list
                if (list.id === destListId) {
                    const newCards = [...list.cards];
                    newCards.splice(destIndex, 0, newCard);
                    return { ...list, cards: newCards };
                }
                return list;
            });
            return { ...board, lists: newLists };
        });

        return { ...state, boards: newBoards };
    }
    
    default:
      return state;
  }
};

export const KanbanProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(kanbanReducer, initialData);

  useEffect(() => {
    try {
      const storedState = localStorage.getItem('kanbanState');
      if (storedState) {
        dispatch({ type: 'SET_STATE', payload: JSON.parse(storedState) });
      }
    } catch (error) {
      console.error("Could not load state from local storage", error);
      // If error, we just use the initialData
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('kanbanState', JSON.stringify(state));
    } catch (error) {
      console.error("Could not save state to local storage", error);
    }
  }, [state]);

  return (
    <KanbanContext.Provider value={{ state, dispatch }}>
      {children}
    </KanbanContext.Provider>
  );
};

export const useKanban = () => {
  const context = useContext(KanbanContext);
  if (!context) {
    throw new Error('useKanban must be used within a KanbanProvider');
  }
  return context;
};
