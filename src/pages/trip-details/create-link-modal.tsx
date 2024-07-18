import { useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useMediaQuery } from '@/hooks/use-media-query';
import { api } from '@/services/axios';
import { Link2, Tag } from 'lucide-react';

interface CreateLinkModalProps {
  isCreateLinkModalOpen: boolean;
  closeCreateLinkModal: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  fetchLinks: () => void;
}

export function CreateLinkModal({
  isCreateLinkModalOpen,
  closeCreateLinkModal,
  loading,
  setLoading,
  fetchLinks,
}: CreateLinkModalProps) {
  const { toast } = useToast();
  const { tripId } = useParams();

  const isDesktop = useMediaQuery('(min-width: 768px)');

  async function createActivity(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const title = data.get('title')?.toString();
    const url = data.get('url')?.toString();

    if (!title || !url) {
      toast({
        title: 'Preencha todos os campos',
        description: 'Preencha todos os campos para criar o link importante.',
      });

      return;
    }

    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      await api.post(`/trips/${tripId}/links`, {
        title,
        url,
      });

      toast({
        title: 'Link criado com sucesso',
        description: 'O link foi criado com sucesso.',
      });

      closeCreateLinkModal();
      fetchLinks();
    } catch (error: any) {
      toast({
        title: 'Erro ao criar link',
        description:
          'Não foi possível criar o link. Tente novamente mais tarde.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {isDesktop ? (
        <Dialog
          open={isCreateLinkModalOpen}
          onOpenChange={closeCreateLinkModal}
        >
          <DialogContent className="bg-zinc-900 border-zinc-800 max-w-[540px]">
            <DialogHeader>
              <h2 className="text-lg font-semibold">Cadastrar link</h2>
            </DialogHeader>
            <p className="text-sm text-zinc-400">
              Todos convidados podem visualizar os links importantes.
            </p>

            <form onSubmit={createActivity} className="space-y-3">
              <div className="h-14 px-2 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <Input
                  startIcon={Tag}
                  type="text"
                  name="title"
                  placeholder="Título do link"
                  className="bg-transparent text-lg flex-1 outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="h-14 flex-1 px-2 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                  <Input
                    startIcon={Link2}
                    type="url"
                    name="url"
                    placeholder="URL"
                    className="bg-transparent text-lg flex-1 outline-none"
                  />
                </div>
              </div>

              <Button type="submit" variant="lime" size="full">
                Confirmar criação da viagem
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer
          open={isCreateLinkModalOpen}
          onOpenChange={closeCreateLinkModal}
        >
          <DrawerContent className="bg-zinc-900 border-zinc-800">
            <DrawerHeader>
              <h2 className="text-lg font-semibold">Cadastrar link</h2>
            </DrawerHeader>
            <p className="text-sm text-zinc-400 space-y-6 px-3">
              Todos convidados podem visualizar os links importantes.
            </p>

            <form onSubmit={createActivity} className="space-y-3 px-3 py-4">
              <div className="h-14 px-2 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <Input
                  startIcon={Tag}
                  type="text"
                  name="title"
                  placeholder="Título do link"
                  className="bg-transparent text-lg flex-1 outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="h-14 flex-1 px-2 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                  <Input
                    startIcon={Link2}
                    type="url"
                    name="url"
                    placeholder="URL"
                    className="bg-transparent text-lg flex-1 outline-none"
                  />
                </div>
              </div>

              <Button type="submit" variant="lime" size="full">
                Confirmar criação da viagem
              </Button>
            </form>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
