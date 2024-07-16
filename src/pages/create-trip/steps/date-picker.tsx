import { DateRange } from 'react-day-picker';

import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader } from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/use-media-query';
import { DayPicker } from '@/lib/day-picker';
import { ptBR } from 'date-fns/locale';

interface DatePickerProps {
  isDatePickerOpen: boolean;
  closeDatePicker: () => void;
  eventStartAndEndDates: DateRange | undefined;
  setEventStartAndEndDates: (dates: DateRange | undefined) => void;
  updatedTrip?: boolean;
}

export function DatePicker({
  isDatePickerOpen,
  closeDatePicker,
  eventStartAndEndDates,
  setEventStartAndEndDates,
  updatedTrip,
}: DatePickerProps) {
  const today = new Date();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <>
      {isDesktop ? (
        <Dialog open={isDatePickerOpen} onOpenChange={closeDatePicker}>
          <DialogContent className="bg-zinc-900 border-zinc-800 max-w-[320px]">
            <DialogHeader>
              <h2 className="text-lg font-semibold">Selecione a data</h2>
            </DialogHeader>

            <DayPicker
              mode="range"
              locale={ptBR}
              selected={eventStartAndEndDates}
              onSelect={setEventStartAndEndDates}
              disabled={{ before: today }}
            />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={isDatePickerOpen} onOpenChange={closeDatePicker}>
          <DrawerContent className="bg-zinc-900 border-zinc-800">
            <DrawerHeader>
              <h2 className="text-lg font-semibold">Selecione a data</h2>
            </DrawerHeader>
            {!updatedTrip && (
              <p className="text-sm text-zinc-400 space-y-6 px-3">
                Selecione a data de início e fim da viagem. Você pode alterar
                posteriormente.
              </p>
            )}

            <DayPicker
              mode="range"
              locale={ptBR}
              selected={eventStartAndEndDates}
              onSelect={setEventStartAndEndDates}
              className="!m-4 flex items-center justify-center py-4"
              disabled={{ before: today }}
            />
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
