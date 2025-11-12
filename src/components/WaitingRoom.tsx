import { MessageCircle, Gamepad2, PlaySquare, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWaitingRoom } from '@/contexts/WaitingRoomContext';
import { Card } from '@/components/ui/card';

const WaitingRoom = () => {
  const { content } = useWaitingRoom();

  const cards = [
    {
      icon: MessageCircle,
      title: content.welcome.title,
      text: content.welcome.text,
      url: null,
    },
    {
      icon: Gamepad2,
      title: content.game.title,
      text: content.game.text,
      url: content.game.url,
    },
    {
      icon: PlaySquare,
      title: content.video.title,
      text: content.video.text,
      url: content.video.url,
    },
    {
      icon: BookOpen,
      title: content.reading.title,
      text: content.reading.text,
      url: content.reading.url,
    },
  ];

  return (
    <div 
      className="min-h-screen p-4 sm:p-6 md:p-8"
      style={{ backgroundColor: content.themeColor + '10' }}
    >
      <div className="max-w-md mx-auto space-y-6">
        {/* Logo */}
        <div className="flex justify-center py-6">
          {content.logoUrl ? (
            <img 
              src={content.logoUrl} 
              alt="Logo" 
              className="h-20 w-auto object-contain"
            />
          ) : (
            <div 
              className="h-20 w-32 rounded-lg flex items-center justify-center text-primary-foreground font-semibold text-lg"
              style={{ backgroundColor: content.themeColor }}
            >
              Logo
            </div>
          )}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-4">
          {cards.map((card, index) => {
            const Icon = card.icon;
            const CardContent = (
              <Card className="p-5 bg-card hover:shadow-lg transition-all duration-300 cursor-pointer border-border">
                <div className="flex items-start gap-4">
                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: content.themeColor + '15' }}
                  >
                    <Icon 
                      className="w-6 h-6" 
                      style={{ color: content.themeColor }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-card-foreground mb-1">
                      {card.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {card.text}
                    </p>
                  </div>
                </div>
              </Card>
            );

            return card.url ? (
              <Link key={index} to={card.url} className="block">
                {CardContent}
              </Link>
            ) : (
              <div key={index}>{CardContent}</div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WaitingRoom;
