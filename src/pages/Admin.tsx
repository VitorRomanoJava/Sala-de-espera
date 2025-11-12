import { useState } from 'react';
import { useWaitingRoom } from '@/contexts/WaitingRoomContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import WaitingRoom from '@/components/WaitingRoom';
import ContentManager from '@/components/ContentManager';
import { toast } from 'sonner';

const Admin = () => {
  const { content, updateContent } = useWaitingRoom();
  const [formData, setFormData] = useState(content);

  const handleSave = () => {
    updateContent(formData);
    toast.success('Alterações salvas com sucesso!');
  };

  const handleInputChange = (
    section: keyof typeof formData,
    field: string,
    value: string
  ) => {
    if (section === 'logoUrl' || section === 'themeColor') {
      setFormData((prev) => ({ ...prev, [section]: value }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [section]: { ...prev[section], [field]: value },
      }));
    }
  };

  return (
    <div className="min-h-screen bg-admin-darker">
      <div className="flex flex-col lg:flex-row">
        {/* Left Column - Forms */}
        <div className="w-full lg:w-[60%] p-6 lg:p-8 space-y-8 overflow-y-auto">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Editor da Sala de Espera
            </h1>
            <p className="text-muted-foreground">
              Personalize o conteúdo da sua sala de espera interativa
            </p>
          </div>

          {/* Visual Customization */}
          <Card className="p-6 space-y-4 bg-card border-border">
            <h2 className="text-xl font-semibold text-card-foreground">
              Customização Visual
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="logoUrl">URL do Logo</Label>
                <Input
                  id="logoUrl"
                  type="text"
                  placeholder="https://exemplo.com/logo.png"
                  value={formData.logoUrl}
                  onChange={(e) => handleInputChange('logoUrl', '', e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="themeColor">Cor Principal do Tema</Label>
                <div className="flex gap-2 mt-1.5">
                  <Input
                    id="themeColor"
                    type="color"
                    value={formData.themeColor}
                    onChange={(e) => handleInputChange('themeColor', '', e.target.value)}
                    className="w-20 h-10"
                  />
                  <Input
                    type="text"
                    value={formData.themeColor}
                    onChange={(e) => handleInputChange('themeColor', '', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Content Slots */}
          <Card className="p-6 space-y-6 bg-card border-border">
            <h2 className="text-xl font-semibold text-card-foreground">
              Conteúdos (Slots)
            </h2>

            {/* Slot 1 - Welcome */}
            <div className="space-y-3 pb-6 border-b border-border">
              <h3 className="font-medium text-card-foreground">Slot 1: Boas-vindas</h3>
              <div>
                <Label htmlFor="welcome-title">Título</Label>
                <Input
                  id="welcome-title"
                  value={formData.welcome.title}
                  onChange={(e) => handleInputChange('welcome', 'title', e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="welcome-text">Texto de Boas-vindas</Label>
                <Textarea
                  id="welcome-text"
                  value={formData.welcome.text}
                  onChange={(e) => handleInputChange('welcome', 'text', e.target.value)}
                  className="mt-1.5"
                  rows={3}
                />
              </div>
            </div>
          </Card>

          {/* Content Lists Management */}
          <ContentManager
            title="Gerenciar Jogos"
            items={formData.games}
            onUpdate={(items) => setFormData({ ...formData, games: items })}
          />

          <ContentManager
            title="Gerenciar Vídeos"
            items={formData.videos}
            onUpdate={(items) => setFormData({ ...formData, videos: items })}
          />

          <ContentManager
            title="Gerenciar Leituras"
            items={formData.readings}
            onUpdate={(items) => setFormData({ ...formData, readings: items })}
          />

          {/* Save Button */}
          <Button onClick={handleSave} size="lg" className="w-full">
            Salvar Alterações
          </Button>

          {/* QR Code Section */}
          <Card className="p-6 space-y-4 bg-card border-border">
            <h2 className="text-xl font-semibold text-card-foreground">
              Link de Acesso (QR Code)
            </h2>
            <div className="flex justify-center">
              <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                <span className="text-sm text-muted-foreground text-center px-2">
                  QR Code
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Mobile Preview */}
        <div className="w-full lg:w-[40%] bg-admin-dark p-6 lg:p-8 lg:sticky lg:top-0 lg:h-screen flex items-center justify-center">
          <div className="w-full max-w-[375px]">
            <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
              Preview Mobile
            </h3>
            <div className="bg-background rounded-xl shadow-2xl overflow-hidden border-8 border-foreground/20 aspect-[9/16]">
              <div className="h-full overflow-y-auto">
                <WaitingRoom />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
