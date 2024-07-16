import { FormEvent, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useNavigate } from 'react-router-dom';

import Loading from '@/components/ui/loading';
import { useToast } from '@/components/ui/use-toast';
import { api } from '@/services/axios';

import { ConfirmTripModal } from './confirm-trip-modal';
import { InviteGuestsModal } from './invite-guests-modal';
import { DestinationAndDateStep } from './steps/destination-and-date-step';
import { InviteGuestsStep } from './steps/invite-guests-step';

export function CreateTripPage() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

  const [destination, setDestination] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >();

  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);

  function openGuestsInput() {
    setIsGuestsInputOpen(true);
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false);
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true);
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false);
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true);
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false);
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get('email')?.toString();

    if (!email) {
      toast({
        title: 'Digite um e-mail',
        description: 'Por favor, insira um e-mail válido.',
      });
      return;
    }

    if (emailsToInvite.includes(email)) {
      toast({
        title: 'E-mail já adicionado',
        description: 'O e-mail informado já foi adicionado.',
      });
      return;
    }

    setEmailsToInvite([...emailsToInvite, email]);
  }

  function removeEmailToInvite(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(
      (email) => email !== emailToRemove,
    );

    setEmailsToInvite(newEmailList);
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!destination) {
      toast({
        title: 'Destino não informado',
        description: 'Por favor, informe o destino da viagem.',
      });
      return;
    }

    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      toast({
        title: 'Datas não informadas',
        description: 'Por favor, informe as datas de início e fim da viagem.',
      });
      return;
    }

    if (emailsToInvite.length === 0) {
      toast({
        title: 'Nenhum convidado',
        description: 'Por favor, adicione pelo menos um e-mail para convidar.',
      });
      return;
    }

    if (!ownerName || !ownerEmail) {
      toast({
        title: 'Dados do organizador',
        description: 'Por favor, informe seu nome e e-mail.',
      });
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.post('/trips', {
        destination,
        starts_at: eventStartAndEndDates?.from,
        ends_at: eventStartAndEndDates?.to,
        emails_to_invite: emailsToInvite,
        owner_name: ownerName,
        owner_email: ownerEmail,
      });

      toast({
        title: 'Viagem criada com sucesso',
        description:
          'Sua viagem foi criada com sucesso. Aguarde o e-mail de confirmação.',
      });

      navigate(`/trips/${data.tripId}`);
    } catch (error) {
      toast({
        title: 'Erro ao criar viagem',
        description: 'Ocorreu um erro ao criar a viagem. Tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading && <Loading />}
      <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
        <div className="w-full max-w-3xl px-6 text-center space-y-10">
          <div className="flex flex-col items-center gap-3">
            <img src="/logo.svg" alt="plann.er" />
            <p className="text-zinc-300 text-lg">
              Convide seus amigos e planeje sua próxima viagem!
            </p>
          </div>

          <div className="space-y-4">
            <DestinationAndDateStep
              isGuestsInputOpen={isGuestsInputOpen}
              openGuestsInput={openGuestsInput}
              closeGuestsInput={closeGuestsInput}
              setDestination={setDestination}
              setEventStartAndEndDates={setEventStartAndEndDates}
              eventStartAndEndDates={eventStartAndEndDates}
            />

            {isGuestsInputOpen && (
              <InviteGuestsStep
                openGuestsModal={openGuestsModal}
                openConfirmTripModal={openConfirmTripModal}
                emailsToInvite={emailsToInvite}
              />
            )}
          </div>

          <p className="text-zinc-500 text-sm">
            Ao planejar sua viagem pela plann.er você automaticamente concorda{' '}
            <br /> com nossos{' '}
            <a className="text-zinc-300 underline" href="#">
              termos de uso
            </a>{' '}
            e{' '}
            <a className="text-zinc-300 underline" href="#">
              políticas de privacidade
            </a>
            .
          </p>
        </div>

        {isGuestsModalOpen && (
          <InviteGuestsModal
            isGuestsModalOpen={isGuestsModalOpen}
            closeGuestsModal={closeGuestsModal}
            emailsToInvite={emailsToInvite}
            removeEmailToInvite={removeEmailToInvite}
            addNewEmailToInvite={addNewEmailToInvite}
            isRemoveEmail
          />
        )}

        {isConfirmTripModalOpen && (
          <ConfirmTripModal
            isConfirmTripModalOpen={isConfirmTripModalOpen}
            closeConfirmTripModal={closeConfirmTripModal}
            createTrip={createTrip}
            setOwnerName={setOwnerName}
            setOwnerEmail={setOwnerEmail}
            destination={destination}
            eventStartAndEndDates={eventStartAndEndDates}
          />
        )}
      </div>
    </>
  );
}
