import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Calendar, MapPin, Settings2 } from 'lucide-react';

export interface Trip {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
}

interface DestinationAndDateHeaderProps {
  openUpdateTripModal: () => void;
  trip: Trip;
  setTrip: (trip: Trip) => void;
}

export function DestinationAndDateHeader({
  openUpdateTripModal,
  trip,
  setTrip,
}: DestinationAndDateHeaderProps) {
  const displayedDate = trip
    ? format(new Date(trip.starts_at), "d 'de' LLL")
        .concat(' até ')
        .concat(format(new Date(trip.ends_at), "d 'de' LLL"))
    : null;

  return (
    <div className="px-4 py-4 lg:py-0 h-auto lg:h-16 rounded-xl bg-zinc-900 shadow-shape flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-2 lg:space-y-0">
      <div className="flex items-center gap-2">
        <MapPin className="text-zinc-400 size-5" />
        <span className="text-zinc-100">{trip?.destination}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="text-zinc-400 size-5" />
          <span className="text-zinc-100">{displayedDate}</span>
        </div>

        <div className="hidden lg:block w-px h-6 bg-zinc-800" />

        <Button
          variant="zinc"
          onClick={openUpdateTripModal}
          className="flex items-center gap-2"
        >
          <span className="hidden lg:inline">Alterar local/data</span>
          <Settings2 className="text-zinc-200 size-5" />
        </Button>
      </div>
    </div>
  );
}
