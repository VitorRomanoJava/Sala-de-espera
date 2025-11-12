import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { ContentItem } from '@/contexts/WaitingRoomContext';

interface ContentManagerProps {
  title: string;
  items: ContentItem[];
  onUpdate: (items: ContentItem[]) => void;
}

const ContentManager = ({ title, items, onUpdate }: ContentManagerProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<ContentItem, 'id'>>({
    title: '',
    description: '',
    url: '',
    imageUrl: '',
  });

  const handleAdd = () => {
    if (!formData.title.trim()) return;
    
    const newItem: ContentItem = {
      id: Date.now().toString(),
      ...formData,
    };
    
    onUpdate([...items, newItem]);
    setFormData({ title: '', description: '', url: '', imageUrl: '' });
    setIsAdding(false);
  };

  const handleEdit = (item: ContentItem) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      description: item.description,
      url: item.url,
      imageUrl: item.imageUrl,
    });
  };

  const handleUpdate = () => {
    if (!formData.title.trim() || !editingId) return;
    
    const updatedItems = items.map((item) =>
      item.id === editingId ? { ...item, ...formData } : item
    );
    
    onUpdate(updatedItems);
    setFormData({ title: '', description: '', url: '', imageUrl: '' });
    setEditingId(null);
  };

  const handleRemove = (id: string) => {
    onUpdate(items.filter((item) => item.id !== id));
  };

  const handleCancel = () => {
    setFormData({ title: '', description: '', url: '', imageUrl: '' });
    setIsAdding(false);
    setEditingId(null);
  };

  return (
    <Card className="p-6 space-y-4 bg-card border-border">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-card-foreground">{title}</h3>
        {!isAdding && !editingId && (
          <Button
            onClick={() => setIsAdding(true)}
            size="sm"
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Adicionar Novo
          </Button>
        )}
      </div>

      {/* Form for Adding/Editing */}
      {(isAdding || editingId) && (
        <div className="space-y-3 p-4 bg-muted/50 rounded-lg border border-border">
          <div>
            <Label htmlFor={`${title}-title`}>Título</Label>
            <Input
              id={`${title}-title`}
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor={`${title}-description`}>Descrição</Label>
            <Textarea
              id={`${title}-description`}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1.5"
              rows={2}
            />
          </div>
          <div>
            <Label htmlFor={`${title}-url`}>URL</Label>
            <Input
              id={`${title}-url`}
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor={`${title}-imageUrl`}>URL da Imagem</Label>
            <Input
              id={`${title}-imageUrl`}
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="mt-1.5"
              placeholder="/src/assets/image.jpg"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={editingId ? handleUpdate : handleAdd} size="sm">
              {editingId ? 'Atualizar' : 'Adicionar'}
            </Button>
            <Button onClick={handleCancel} size="sm" variant="outline">
              Cancelar
            </Button>
          </div>
        </div>
      )}

      {/* List of Items */}
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3 bg-background rounded-lg border border-border"
          >
            <div className="flex-1">
              <p className="font-medium text-foreground">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => handleEdit(item)}
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => handleRemove(item.id)}
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ContentManager;
