import { useState } from 'react';
import { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { ArrowRight, Calendar, MapPin, Settings2 } from 'lucide-react';

import 'react-day-picker/dist/style.css';
import { DatePicker } from './date-picker';

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean;
  openGuestsInput: () => void;
  closeGuestsInput: () => void;
  setDestination: (destination: string) => void;
  setEventStartAndEndDates: (dates: DateRange | undefined) => void;
  eventStartAndEndDates: DateRange | undefined;
}

export function DestinationAndDateStep({
  isGuestsInputOpen,
  openGuestsInput,
  closeGuestsInput,
  setDestination,
  setEventStartAndEndDates,
  eventStartAndEndDates,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
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
    <div className="bg-zinc-900 px-4 py-2 rounded-xl flex flex-col md:flex-row items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1 w-full md:w-auto">
        <Input
          startIcon={MapPin}
          type="text"
          disabled={isGuestsInputOpen}
          placeholder="Para onde você vai?"
          className="bg-transparent text-lg outline-none flex-1"
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      <Button
        onClick={openDatePicker}
        className="flex items-center gap-2 px-2 text-left bg-transparent hover:bg-transparent w-full md:w-[240px]"
        disabled={isGuestsInputOpen}
      >
        <Calendar className="text-zinc-200 size-5 shrink-0" />
        <span className="text-lg text-zinc-400 flex-1">
          {displayedDate || 'Quando?'}
        </span>
      </Button>

      {isDatePickerOpen && (
        <DatePicker
          isDatePickerOpen={isDatePickerOpen}
          closeDatePicker={closeDatePicker}
          eventStartAndEndDates={eventStartAndEndDates}
          setEventStartAndEndDates={setEventStartAndEndDates}
        />
      )}

      <div className="w-full md:w-px h-px md:h-6 bg-zinc-800 md:mx-4" />

      {isGuestsInputOpen ? (
        <Button
          onClick={closeGuestsInput}
          variant="zinc"
          className="w-full md:w-auto"
        >
          Alterar local/data
          <Settings2 className="text-zinc-200 size-5" />
        </Button>
      ) : (
        <Button
          onClick={openGuestsInput}
          variant="lime"
          className="w-full md:w-auto"
          disabled={
            !eventStartAndEndDates ||
            !eventStartAndEndDates.from ||
            !eventStartAndEndDates.to
          }
        >
          Continuar
          <ArrowRight className="text-lime-950 size-5" />
        </Button>
      )}
    </div>
  );
}
