import { useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useMediaQuery } from '@/hooks/use-media-query';
import { api } from '@/services/axios';
import { Calendar, Tag } from 'lucide-react';

interface CreateActivityModalProps {
  isCreateActivityModalOpen: boolean;
  closeCreateActivityModal: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  fetchActivities: () => void;
}

export function CreateActivityModal({
  isCreateActivityModalOpen,
  closeCreateActivityModal,
  loading,
  setLoading,
  fetchActivities,
}: CreateActivityModalProps) {
  const { toast } = useToast();
  const { tripId } = useParams();

  const isDesktop = useMediaQuery('(min-width: 768px)');

  async function createActivity(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const title = data.get('title')?.toString();
    const occurs_at = data.get('occurs_at')?.toString();

    if (!title || !occurs_at) {
      toast({
        title: 'Preencha todos os campos',
        description: 'Preencha todos os campos para criar a atividade.',
      });

      return;
    }

    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      await api.post(`/trips/${tripId}/activities`, {
        title,
        occurs_at,
      });

      toast({
        title: 'Atividade criada com sucesso',
        description: 'A atividade foi criada com sucesso.',
      });

      closeCreateActivityModal();
      fetchActivities();
    } catch (error: any) {
      if (error?.message === 'Invalid activity date.') {
        toast({
          title: 'Data inválida',
          description: 'A data da atividade não pode ser no passado.',
        });

        return;
      }

      toast({
        title: 'Erro ao criar atividade',
        description:
          'Não foi possível criar a atividade. Tente novamente mais tarde.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {isDesktop ? (
        <Dialog
          open={isCreateActivityModalOpen}
          onOpenChange={closeCreateActivityModal}
        >
          <DialogContent className="bg-zinc-900 border-zinc-800 max-w-[540px]">
            <DialogHeader>
              <h2 className="text-lg font-semibold">Cadastrar atividade</h2>
            </DialogHeader>
            <p className="text-sm text-zinc-400">
              Todos convidados podem visualizar as atividades.
            </p>

            <form onSubmit={createActivity} className="space-y-3">
              <div className="h-14 px-2 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <Input
                  startIcon={Tag}
                  type="text"
                  name="title"
                  placeholder="Qual a atividade?"
                  className="bg-transparent text-lg flex-1 outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="h-14 flex-1 px-2 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                  <Input
                    startIcon={Calendar}
                    type="datetime-local"
                    name="occurs_at"
                    placeholder="Data e horário da atividade"
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
          open={isCreateActivityModalOpen}
          onOpenChange={closeCreateActivityModal}
        >
          <DrawerContent className="bg-zinc-900 border-zinc-800">
            <DrawerHeader>
              <h2 className="text-lg font-semibold">Cadastrar atividade</h2>
            </DrawerHeader>
            <p className="text-sm text-zinc-400 space-y-6 px-3">
              Todos convidados podem visualizar as atividades.
            </p>

            <form onSubmit={createActivity} className="space-y-3 px-3 py-4">
              <div className="h-14 px-2 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <Input
                  startIcon={Tag}
                  type="text"
                  name="title"
                  placeholder="Qual a atividade?"
                  className="bg-transparent text-lg flex-1 outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="h-14 flex-1 px-2 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                  <Input
                    startIcon={Calendar}
                    type="datetime-local"
                    name="occurs_at"
                    placeholder="Data e horário da atividade"
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
