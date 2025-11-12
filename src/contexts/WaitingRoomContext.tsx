import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ContentSlot {
  title: string;
  text: string;
  url?: string;
}

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
}

export interface WaitingRoomContent {
  logoUrl: string;
  themeColor: string;
  welcome: ContentSlot;
  game: ContentSlot;
  video: ContentSlot;
  reading: ContentSlot;
  games: ContentItem[];
  videos: ContentItem[];
  readings: ContentItem[];
}

interface WaitingRoomContextType {
  content: WaitingRoomContent;
  updateContent: (newContent: Partial<WaitingRoomContent>) => void;
}

const defaultContent: WaitingRoomContent = {
  logoUrl: '',
  themeColor: '#0891b2',
  welcome: {
    title: 'Mensagem de Boas-Vindas',
    text: 'Seja bem-vindo! Sinta-se à vontade enquanto aguarda.',
  },
  game: {
    title: 'Jogos',
    text: 'Veja nossas opções de jogos',
    url: '/games',
  },
  video: {
    title: 'Vídeos',
    text: 'Assista aos nossos vídeos',
    url: '/videos',
  },
  reading: {
    title: 'Leitura Rápida',
    text: 'Leia artigos e notícias',
    url: '/readings',
  },
  games: [
    { id: '1', title: 'Sudoku', description: 'Teste seu raciocínio lógico.', url: '#', imageUrl: '/src/assets/sudoku-cover.jpg' },
    { id: '2', title: 'Jogo da Velha', description: 'Desafie um amigo.', url: '#', imageUrl: '/src/assets/tictactoe-cover.jpg' },
    { id: '3', title: 'Palavras Cruzadas', description: 'Relaxe sua mente.', url: '#', imageUrl: '/src/assets/crossword-cover.jpg' },
  ],
  videos: [
    { id: '1', title: 'Vídeo Institucional', description: 'Conheça nossa história.', url: '#', imageUrl: '/src/assets/institutional-video-cover.jpg' },
    { id: '2', title: 'Destaques da Semana', description: 'Veja o que há de novo.', url: '#', imageUrl: '/src/assets/highlights-video-cover.jpg' },
  ],
  readings: [
    { id: '1', title: 'Artigo 1', description: 'Leia sobre novidades.', url: '#', imageUrl: '/src/assets/article-cover.jpg' },
    { id: '2', title: 'Notícia 2', description: 'Fique por dentro.', url: '#', imageUrl: '/src/assets/news-cover.jpg' },
  ],
};

const WaitingRoomContext = createContext<WaitingRoomContextType | undefined>(undefined);

export const WaitingRoomProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<WaitingRoomContent>(defaultContent);

  const updateContent = (newContent: Partial<WaitingRoomContent>) => {
    setContent((prev) => ({ ...prev, ...newContent }));
  };

  return (
    <WaitingRoomContext.Provider value={{ content, updateContent }}>
      {children}
    </WaitingRoomContext.Provider>
  );
};

export const useWaitingRoom = () => {
  const context = useContext(WaitingRoomContext);
  if (!context) {
    throw new Error('useWaitingRoom must be used within WaitingRoomProvider');
  }
  return context;
};
