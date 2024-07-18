import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useMediaQuery } from '@/hooks/use-media-query';
import { api } from '@/services/axios';
import { format } from 'date-fns';
import { Calendar, MapPin } from 'lucide-react';

import { DatePicker } from '../create-trip/steps/date-picker';

interface CreateLinkModalProps {
  isUpdateTripModalOpen: boolean;
  closeUpdateTripModal: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  fetchTrip: () => void;
}

export function UpdateTripModal({
  isUpdateTripModalOpen,
  closeUpdateTripModal,
  loading,
  setLoading,
  fetchTrip,
}: CreateLinkModalProps) {
  const { toast } = useToast();
  const { tripId } = useParams();

  const isDesktop = useMediaQuery('(min-width: 768px)');

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >();

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  async function createActivity(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const destination = data.get('destination')?.toString();

    if (!destination) {
      toast({
        title: 'Preencha todos os campos',
        description: 'Preencha todos os campos para criar a viagem.',
      });

      return;
    }

    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      toast({
        title: 'Selecione a data',
        description: 'Selecione a data da viagem.',
      });

      return;
    }

    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      await api.put(`/trips/${tripId}`, {
        destination,
        starts_at: eventStartAndEndDates.from,
        ends_at: eventStartAndEndDates.to,
      });

      toast({
        title: 'Viagem Atualizada',
        description: 'A viagem foi atualizada com sucesso.',
      });

      closeUpdateTripModal();
      fetchTrip();
    } catch (error: any) {
      toast({
        title: 'Erro ao atualizar viagem',
        description:
          'Não foi possível atualizar a viagem. Tente novamente mais tarde.',
      });
    } finally {
      setLoading(false);
    }
  }

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
          open={isUpdateTripModalOpen}
          onOpenChange={closeUpdateTripModal}
        >
          <DialogContent className="bg-zinc-900 border-zinc-800 max-w-[540px]">
            <DialogHeader>
              <h2 className="text-lg font-semibold">Alterar local/data</h2>
            </DialogHeader>
            <p className="text-sm text-zinc-400">
              A alteração será refletida para todos os convidados.
            </p>

            <form onSubmit={createActivity} className="space-y-3">
              <div className="h-14 px-2 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <Input
                  startIcon={MapPin}
                  type="text"
                  name="destination"
                  placeholder="Para onde você vai?"
                  className="bg-transparent text-lg flex-1 outline-none"
                />
              </div>

              <Button
                onClick={openDatePicker}
                className="flex items-center gap-2 text-left bg-zinc-950 w-full hover:bg-transparent h-14 border border-input border-none"
              >
                <Calendar className="text-zinc-200 size-5" />
                <span className="text-lg w-40 text-zinc-400 flex-1">
                  {displayedDate || 'Quando?'}
                </span>
              </Button>

              {isDatePickerOpen && (
                <DatePicker
                  isDatePickerOpen={isDatePickerOpen}
                  closeDatePicker={closeDatePicker}
                  eventStartAndEndDates={eventStartAndEndDates}
                  setEventStartAndEndDates={setEventStartAndEndDates}
                  updatedTrip={true}
                />
              )}

              <Button type="submit" variant="lime" size="full">
                Confirmar criação da viagem
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer
          open={isUpdateTripModalOpen}
          onOpenChange={closeUpdateTripModal}
        >
          <DrawerContent className="bg-zinc-900 border-zinc-800">
            <DrawerHeader>
              <h2 className="text-lg font-semibold">Alterar local/data</h2>
            </DrawerHeader>
            <p className="text-sm text-zinc-400 space-y-6 px-3">
              A alteração será refletida para todos os convidados.
            </p>

            <form onSubmit={createActivity} className="space-y-3 px-3 py-4">
              <div className="h-14 px-2 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <Input
                  startIcon={MapPin}
                  type="text"
                  name="destination"
                  placeholder="Para onde você vai?"
                  className="bg-transparent text-lg flex-1 outline-none"
                />
              </div>

              <Button
                onClick={openDatePicker}
                className="flex items-center gap-2 text-left bg-zinc-950 w-full hover:bg-transparent h-14 border border-input border-none"
              >
                <Calendar className="text-zinc-200 size-5" />
                <span className="text-lg w-40 text-zinc-400 flex-1">
                  {displayedDate || 'Quando?'}
                </span>
              </Button>

              {isDatePickerOpen && (
                <DatePicker
                  isDatePickerOpen={isDatePickerOpen}
                  closeDatePicker={closeDatePicker}
                  eventStartAndEndDates={eventStartAndEndDates}
                  setEventStartAndEndDates={setEventStartAndEndDates}
                  updatedTrip={true}
                />
              )}

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
