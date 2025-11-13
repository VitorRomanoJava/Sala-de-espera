import { useState, useEffect } from 'react'; 
import { MessageCircle, Gamepad2, PlaySquare, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWaitingRoom } from '@/contexts/WaitingRoomContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button'; 

import sudokuImg from '@/assets/sudoku-cover.jpg';
import tictactoeImg from '@/assets/tictactoe-cover.jpg';
import crosswordImg from '@/assets/crossword-cover.jpg';
// Imports de imagens de notícias removidos (usam /public)


const WaitingRoom = () => {
  const { content } = useWaitingRoom();

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []); 

  const timeFormatter = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit', 
    timeZone: 'America/Sao_Paulo',
  });

  const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long', 
    day: '2-digit',
    month: 'long', 
    timeZone: 'America/Sao_Paulo',
  });

  // ETAPA 21: Array de 'cards' (Boas-Vindas) esvaziado
  const cards = [];

  // Lista de filmes (conforme seu código)
  const filmes = [
    { id: 1, title: "Divertidamente", imageUrl: "capa-filmes/divertidamente.png" },
    { id: 2, title: "O Hobbit", imageUrl: "capa-filmes/hobbit.jpg" },
    { id: 3, title: "Matrix", imageUrl: "capa-filmes/matrix.webp" },
    { id: 4, title: "Toy Story 5", imageUrl: "capa-filmes/Toy_Story_5.jpg" },
    { id: 6, title: "deadpool ", imageUrl: "capa-filmes/deadpool.webp" },
  ];

  // Lista de jogos (conforme seu código)
  const jogos = [
    { id: 1, title: "Sudoku", imageUrl: sudokuImg },
    { id: 2, title: "Jogo da Velha", imageUrl: tictactoeImg },
    { id: 3, title: "Palavras Cruzadas", imageUrl: crosswordImg },
    { id: 4, title: "Palavras Cruzadas", imageUrl: crosswordImg },
  ];

  // Lista de 'noticias' (conforme seu código)
  const noticias = [
    { id: 1, title: "Artigo 1", imageUrl: "/noticiafake1.webp" },
    { id: 2, title: "Notícia 2", imageUrl: "/noticiafake2.png" },
  ];

  const loremIpsumText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";


  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: content.themeColor + '10' }}
    >
      {/* Cabeçalho */}
      <header className="flex items-center justify-start space-x-6 p-4 sm:px-6 md:px-8">
        <div className="flex justify-start">
          <img 
            src="/capucho.webp" 
            alt="Logo Capucho" 
            className="h-12 w-auto object-contain"
          />
        </div>
        <div className="text-left text-foreground">
          <div className="font-bold text-xl leading-none">
            {timeFormatter.format(now)}
          </div>
        </div>
        <div className="text-left text-foreground">
          <div className="text-sm text-muted-foreground">
            {dateFormatter.format(now)}
          </div>
        </div>
      </header>

      {/* Bloco de Filmes */}
      <div className="pt-6 w-full"> 
        <h3 className="text-[3rem] font-bold text-foreground text-left leading-tight px-4 sm:px-6 md:px-8 mb-[50px]">
          Vídeos que você pode gostar
        </h3>
        <div className="flex overflow-x-auto space-x-6 pb-4 px-4 sm:px-6 md:px-8">
          {filmes.map((filme) => (
            <div key={filme.id} className="flex-shrink-0">
              <img 
                src={filme.imageUrl}
                alt={filme.title}
                className="w-52 h-68 object-cover rounded-md shadow-lg"
              />
            </div>
          ))}
          <div className="flex items-center">
            <Button 
              asChild 
              className="
                rounded-full 
                bg-[#c1e0f5] text-black hover:bg-[#c1e0f5]/80 
                text-[20px] font-bold 
                px-10 py-5
              "
            >
              <Link to={content.video.url}>
                Ver Mais
              </Link>
            </Button>
          </div>
        </div>
      </div>
      {/* Fim da Seção de Filmes */}

      {/* Bloco de Jogos */}
      <div className="pt-6 w-full"> 
        <h3 className="text-[3rem] font-bold text-foreground text-left leading-tight px-4 sm:px-6 md:px-8 mb-[50px]">
          Jogos
        </h3>
        <div className="flex overflow-x-auto space-x-6 pb-4 px-4 sm:px-6 md:px-8">
          {jogos.map((jogo) => (
            <div key={jogo.id} className="flex-shrink-0">
              <img 
                src={jogo.imageUrl}
                alt={jogo.title}
                className="w-52 h-68 object-cover rounded-md shadow-lg"
              />
            </div>
          ))}
          <div className="flex items-center">
            <Button 
              asChild 
              className="
                rounded-full 
                bg-[#c1e0f5] text-black hover:bg-[#c1e0f5]/80 
                text-[20px] font-bold 
                px-10 py-5
              "
            >
              <Link to={content.game.url}>
                Ver Mais
              </Link>
            </Button>
          </div>
        </div>
      </div>
      {/* Fim da Seção de Jogos */}
      
      {/* Bloco de Notícias (Layout de Grade ZigZag) */}
      <div className="pt-6 w-full"> 
        <h3 className="text-[3rem] font-bold text-foreground text-left leading-tight px-4 sm:px-6 md:px-8 mb-[50px]">
          Notícias
        </h3>
        <div className="grid grid-cols-2 gap-6 pb-4 px-4 sm:px-6 md:px-8">
          
          {noticias.map((noticia, index) => (
            <div key={noticia.id} className="flex flex-col space-y-4">
              
              {index % 2 === 0 && (
                <>
                  {/* (Correção: text-ligth -> text-light) */}
                  <p className="text-light text-muted-foreground text-left">
                    {loremIpsumText}
                  </p>
                  <img 
                    src={noticia.imageUrl}
                    alt={noticia.title}
                    /* (Tamanho da imagem conforme seu código) */
                    className="w-full h-78 object-cover rounded-md shadow-lg"
                  />
                </>
              )}

              {index % 2 !== 0 && (
                <>
                  <img 
                    src={noticia.imageUrl}
                    alt={noticia.title}
                    /* (Tamanhos da imagem conforme seu código) */
                    className="w-38 h-58 object-cover rounded-md shadow-lg"
                  />
                  <p className="text-sm text-muted-foreground text-left">
                    {loremIpsumText}
                  </p>
                </>
              )}
            </div>
          ))}
          
        </div>
        
        <div className="flex justify-start mt-4 px-4 sm:px-6 md:px-8">
          <Button 
            asChild 
            className="
              rounded-full 
              bg-[#c1e0f5] text-black hover:bg-[#c1e0f5]/80 
              text-[20px] font-bold 
              px-10 py-5
            "
          >
            <Link to={content.reading.url}>
              Ver Mais
            </Link>
          </Button>
        </div>
      </div>
      {/* Fim da Seção de Notícias */}


      {/* ETAPA 21: Bloco Centralizado (Boas-Vindas) REMOVIDO */}

    </div>
  );
};

export default WaitingRoom;