import { Button } from '@/components/ui/button';
import { ArrowRight, UserRoundPlus } from 'lucide-react';

interface InviteGuestsStepProps {
  openGuestsModal: () => void;
  openConfirmTripModal: () => void;
  emailsToInvite: string[];
}

export function InviteGuestsStep({
  openGuestsModal,
  openConfirmTripModal,
  emailsToInvite,
}: InviteGuestsStepProps) {
  return (
    <div className="bg-zinc-900 px-4 py-2 rounded-xl flex flex-col md:flex-row items-center shadow-shape gap-3">
      <Button
        onClick={openGuestsModal}
        className="flex p-0 items-center gap-2 flex-1 w-full md:w-auto bg-transparent hover:bg-transparent"
      >
        <UserRoundPlus className="text-zinc-400 size-5" />
        {emailsToInvite.length > 0 ? (
          <span className="text-zinc-100 flex-1 text-left text-lg font-normal">
            {emailsToInvite.length} pessoa(s) convidada(s)
          </span>
        ) : (
          <span className="text-zinc-400 flex-1 text-left text-lg font-normal">
            Quem estará na viagem?
          </span>
        )}
      </Button>

      <div className="w-full md:w-px h-px md:h-6 bg-zinc-800 md:mx-4" />

      <Button
        onClick={openConfirmTripModal}
        variant="lime"
        className="w-full md:w-auto"
      >
        Confirmar viagem
        <ArrowRight className="text-lime-950 size-5" />
      </Button>
    </div>
  );
}
