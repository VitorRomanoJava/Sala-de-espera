import { ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useWaitingRoom } from '@/contexts/WaitingRoomContext';

const ContentList = () => {
  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>();
  const { content } = useWaitingRoom();

  const getCategoryData = () => {
    switch (category) {
      case 'games':
        return {
          title: '🎮 Nossos Jogos',
          items: content.games,
        };
      case 'videos':
        return {
          title: '📺 Nossos Vídeos',
          items: content.videos,
        };
      case 'readings':
        return {
          title: '📚 Nossas Leituras',
          items: content.readings,
        };
      default:
        return {
          title: 'Conteúdo',
          items: [],
        };
    }
  };

  const { title, items } = getCategoryData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gallery-gradient-start to-gallery-gradient-end">
      {/* Fixed Header */}
      <header className="sticky top-0 z-10 bg-gallery-bg/95 backdrop-blur-sm border-b border-white/10 shadow-lg">
        <div className="flex items-center px-4 py-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="flex-1 text-center text-xl font-bold text-white pr-10">
            {title}
          </h1>
        </div>
      </header>

      {/* Gallery Grid */}
      <div className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {items.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/20 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-primary/50">
                {/* Image Container */}
                <div className="aspect-square overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {/* Overlay gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Card Content */}
                <div className="p-3 md:p-4 bg-gradient-to-t from-black/40 to-transparent">
                  <h3 className="font-bold text-white text-center text-sm md:text-base mb-1 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/70 text-center line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentList;
