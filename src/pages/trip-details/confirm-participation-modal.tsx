import { useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useMediaQuery } from '@/hooks/use-media-query';
import { api } from '@/services/axios';
import { Mail, User } from 'lucide-react';

interface CreateLinkModalProps {
  isConfirmParticipationModalOpen: boolean;
  closeConfirmParticipationModal: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  destination?: string;
  displayedDate?: string | null;
  fetchParticipants: () => void;
}

export function ConfirmParticipationModal({
  isConfirmParticipationModalOpen,
  closeConfirmParticipationModal,
  loading,
  setLoading,
  destination,
  displayedDate,
  fetchParticipants,
}: CreateLinkModalProps) {
  const { toast } = useToast();
  const { participantId } = useParams();

  const isDesktop = useMediaQuery('(min-width: 768px)');

  async function confirmParticipation(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const name = data.get('name')?.toString();
    const email = data.get('email')?.toString();

    if (!name || !email) {
      toast({
        title: 'Preencha todos os campos',
        description: 'Preencha todos os campos para confirmar sua presença.',
      });

      return;
    }

    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      await api.get(`/participants/${participantId}/confirm`);

      toast({
        title: 'Confirmação de presença',
        description: 'Sua presença foi confirmada com sucesso!',
      });

      closeConfirmParticipationModal();
      fetchParticipants();
    } catch (error: any) {
      toast({
        title: 'Erro ao confirmar presença',
        description:
          'Não foi possível confirmar sua presença. Tente novamente mais tarde.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {isDesktop ? (
        <Dialog
          open={isConfirmParticipationModalOpen}
          onOpenChange={closeConfirmParticipationModal}
        >
          <DialogContent className="bg-zinc-900 border-zinc-800 max-w-[540px]">
            <DialogHeader>
              <h2 className="text-lg font-semibold">Confirmar presença</h2>
            </DialogHeader>
            <p className="text-sm text-zinc-400">
              Você foi convidado(a) para participar de uma viagem para{' '}
              <span className="font-semibold text-zinc-100">{destination}</span>{' '}
              nas datas de{' '}
              <span className="font-semibold text-zinc-100">
                {displayedDate}
              </span>
              .
              <br />
              Para confirmar sua presença na viagem, preencha os dados abaixo:
            </p>

            <form onSubmit={confirmParticipation} className="space-y-3">
              <div className="h-14 px-2 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <Input
                  startIcon={User}
                  type="text"
                  name="name"
                  placeholder="Seu nome completo"
                  className="bg-transparent text-lg flex-1 outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="h-14 flex-1 px-2 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                  <Input
                    startIcon={Mail}
                    type="email"
                    name="email"
                    placeholder="E-mail de confirmação"
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
          open={isConfirmParticipationModalOpen}
          onOpenChange={closeConfirmParticipationModal}
        >
          <DrawerContent className="bg-zinc-900 border-zinc-800">
            <DrawerHeader>
              <h2 className="text-lg font-semibold">Confirmar presença</h2>
            </DrawerHeader>
            <p className="text-sm text-zinc-400 space-y-6 px-3">
              Você foi convidado(a) para participar de uma viagem para{' '}
              <span className="font-semibold text-zinc-100">{destination}</span>{' '}
              nas datas de{' '}
              <span className="font-semibold text-zinc-100">
                {displayedDate}
              </span>
              .
              <br />
              Para confirmar sua presença na viagem, preencha os dados abaixo:
            </p>

            <form
              onSubmit={confirmParticipation}
              className="space-y-3 px-3 py-4"
            >
              <div className="h-14 px-2 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <Input
                  startIcon={User}
                  type="text"
                  name="name"
                  placeholder="Seu nome completo"
                  className="bg-transparent text-lg flex-1 outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="h-14 flex-1 px-2 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                  <Input
                    startIcon={Mail}
                    type="email"
                    name="email"
                    placeholder="E-mail de confirmação"
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
