import { FormEvent } from 'react';
import { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { useMediaQuery } from '@/hooks/use-media-query';
import { format } from 'date-fns';
import { Mail, User } from 'lucide-react';

interface ConfirmTripModalProps {
  isConfirmTripModalOpen: boolean;
  closeConfirmTripModal: () => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
  setOwnerName: (ownerName: string) => void;
  setOwnerEmail: (ownerEmail: string) => void;
  destination: string;
  eventStartAndEndDates: DateRange | undefined;
}

export function ConfirmTripModal({
  isConfirmTripModalOpen,
  closeConfirmTripModal,
  createTrip,
  setOwnerName,
  setOwnerEmail,
  destination,
  eventStartAndEndDates,
}: ConfirmTripModalProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const displayedDate =
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
      ? format(eventStartAndEndDates.from, "d 'de' LLL")
          .concat(' até ')
          .concat(format(eventStartAndEndDates.to, "d 'de' LLL"))
      : null;

  return (
    <>
      {isDesktop ? (
        <Dialog
          open={isConfirmTripModalOpen}
          onOpenChange={closeConfirmTripModal}
        >
          <DialogContent className="bg-zinc-900 border-zinc-800 max-w-fit">
            <DialogHeader>
              <h2 className="text-lg font-semibold">
                Confirmar criação de viagem
              </h2>
            </DialogHeader>
            <p className="text-sm text-zinc-400">
              Para concluir a criação da viagem para{' '}
              <span className="text-zinc-100 font-semibold">{destination}</span>{' '}
              nas datas de{' '}
              <span className="text-zinc-100 font-semibold">
                {displayedDate}
              </span>{' '}
              preencha seus dados abaixo:
            </p>

            <form onSubmit={createTrip} className="space-y-3">
              <div className="h-14 px-2 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <Input
                  startIcon={User}
                  type="text"
                  name="name"
                  placeholder="Seu nome completo"
                  className="bg-transparent text-lg flex-1 outline-none"
                  onChange={(event) => setOwnerName(event.target.value)}
                />
              </div>

              <div className="h-14 px-2 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <Input
                  startIcon={Mail}
                  type="email"
                  name="email"
                  placeholder="Seu e-mail pessoal"
                  className="bg-transparent text-lg flex-1 outline-none"
                  onChange={(event) => setOwnerEmail(event.target.value)}
                />
              </div>

              <Button type="submit" variant="lime" size="full">
                Confirmar criação da viagem
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer
          open={isConfirmTripModalOpen}
          onOpenChange={closeConfirmTripModal}
        >
          <DrawerContent className="bg-zinc-900 border-zinc-800 max-w-fit">
            <DrawerHeader>
              <h2 className="text-lg font-semibold">
                Confirmar criação de viagem
              </h2>
            </DrawerHeader>
            <p className="text-sm text-zinc-400 space-y-6 px-3">
              Para concluir a criação da viagem para{' '}
              <span className="text-zinc-100 font-semibold">{destination}</span>{' '}
              nas datas de{' '}
              <span className="text-zinc-100 font-semibold">
                {displayedDate}
              </span>{' '}
              preencha seus dados abaixo:
            </p>

            <form onSubmit={createTrip} className="space-y-3 px-3 py-4">
              <div className="h-14 px-2 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <Input
                  startIcon={User}
                  type="text"
                  name="name"
                  placeholder="Seu nome completo"
                  className="bg-transparent text-lg flex-1 outline-none"
                  onChange={(event) => setOwnerName(event.target.value)}
                />
              </div>

              <div className="h-14 px-2 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <Input
                  startIcon={Mail}
                  type="email"
                  name="email"
                  placeholder="Seu e-mail pessoal"
                  className="bg-transparent text-lg flex-1 outline-none"
                  onChange={(event) => setOwnerEmail(event.target.value)}
                />
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
