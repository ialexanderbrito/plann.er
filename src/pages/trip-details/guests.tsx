import { Button } from '@/components/ui/button';
import { CheckCircle2, CircleDashed, UserCog } from 'lucide-react';

export interface Participant {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
  is_owner: boolean;
}

interface GuestsProps {
  openInviteGuestsModal: () => void;
  participants: Participant[];
  setParticipants: (participants: Participant[]) => void;
}

export function Guests({
  openInviteGuestsModal,
  participants,
  setParticipants,
}: GuestsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Convidados</h2>
      <div className="space-y-5">
        {participants.map((participant, index) => (
          <div
            key={participant.id}
            className="flex items-center justify-between gap-4"
          >
            <div className="space-y-1.5 w-64">
              <span className="block font-medium text-zinc-100">
                {participant.name ?? `Convidado ${index}`}
              </span>
              <span className="block text-sm text-zinc-400 truncate">
                {participant.email}
              </span>
            </div>
            {participant.is_confirmed ? (
              <CheckCircle2 className="text-green-400 size-5 shrink-0" />
            ) : (
              <CircleDashed className="text-zinc-400 size-5 shrink-0" />
            )}
          </div>
        ))}
      </div>

      <Button variant="zinc" size="full" onClick={openInviteGuestsModal}>
        <UserCog className="text-zinc-200 size-5" />
        Gerenciar convidados
      </Button>
    </div>
  );
}
