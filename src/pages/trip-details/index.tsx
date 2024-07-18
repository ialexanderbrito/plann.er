import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import Loading from '@/components/ui/loading';
import { useToast } from '@/components/ui/use-toast';
import { api } from '@/services/axios';
import { format } from 'date-fns';
import { Plus } from 'lucide-react';

import { InviteGuestsModal } from '../create-trip/invite-guests-modal';
import { Activities, Activity } from './activities';
import { ConfirmParticipationModal } from './confirm-participation-modal';
import { CreateActivityModal } from './create-activity-modal';
import { CreateLinkModal } from './create-link-modal';
import { DestinationAndDateHeader, Trip } from './destination-and-date-header';
import { Guests, Participant } from './guests';
import { ImportantLinks, LinkImportant } from './important-links';
import { UpdateTripModal } from './update-trip-modal';

export function TripDetailsPage() {
  const { toast } = useToast();
  const { tripId, participantId } = useParams<{
    tripId: string;
    participantId?: string;
  }>();

  const [loading, setLoading] = useState(false);

  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);
  const [isUpdateTripModalOpen, setIsUpdateTripModalOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmParticipationModalOpen, setIsConfirmParticipationModalOpen] =
    useState(false);

  const [activities, setActivities] = useState<Activity[]>([]);
  const [linksImportants, setLinksImportants] = useState<LinkImportant[]>([]);
  const [trip, setTrip] = useState<Trip | undefined>();
  const [participants, setParticipants] = useState<Participant[]>([]);

  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true);
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false);
  }

  function openCreateLinkModal() {
    setIsCreateLinkModalOpen(true);
  }

  function closeCreateLinkModal() {
    setIsCreateLinkModalOpen(false);
  }

  function openUpdateTripModal() {
    setIsUpdateTripModalOpen(true);
  }

  function closeUpdateTripModal() {
    setIsUpdateTripModalOpen(false);
  }

  function openInviteGuestsModal() {
    setIsGuestsModalOpen(true);
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false);
  }

  function openConfirmParticipationModal() {
    setIsConfirmParticipationModalOpen(true);
  }

  function closeConfirmParticipationModal() {
    setIsConfirmParticipationModalOpen(false);
  }

  useEffect(() => {
    try {
      setLoading(true);

      api.get(`/trips/${tripId}/participants`).then((response) => {
        const justEmails = response.data.participants.map(
          (participant: Participant) => participant.email,
        );

        setEmailsToInvite(justEmails);
      });
    } catch (error) {
      toast({
        title: 'Erro ao carregar viagem',
        description:
          'Não foi possível carregar a viagem. Tente novamente mais tarde.',
      });
    } finally {
      setLoading(false);
    }
  }, [tripId, toast]);

  const fetchActivities = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await api.get(`/trips/${tripId}/activities`);

      setActivities(data.activities);
    } catch (error) {
      toast({
        title: 'Erro ao carregar viagem',
        description:
          'Não foi possível carregar a viagem. Tente novamente mais tarde.',
      });
    } finally {
      setLoading(false);
    }
  }, [tripId, toast]);

  const fetchLinks = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await api.get(`/trips/${tripId}/links`);

      setLinksImportants(data.links);
    } catch (error) {
      toast({
        title: 'Erro ao carregar viagem',
        description:
          'Não foi possível carregar a viagem. Tente novamente mais tarde.',
      });
    } finally {
      setLoading(false);
    }
  }, [tripId, toast]);

  const fetchTrip = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await api.get(`/trips/${tripId}`);

      setTrip(data.trip);
    } catch (error) {
      toast({
        title: 'Erro ao carregar viagem',
        description:
          'Não foi possível carregar a viagem. Tente novamente mais tarde.',
      });
    } finally {
      setLoading(false);
    }
  }, [tripId, toast]);

  const fetchParticipants = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await api.get(`/trips/${tripId}/participants`);

      setParticipants(data.participants);
    } catch (error) {
      toast({
        title: 'Erro ao carregar os participantes',
        description:
          'Não foi possível carregar os participantes. Tente novamente mais tarde.',
      });
    } finally {
      setLoading(false);
    }
  }, [tripId, toast]);

  useEffect(() => {
    fetchActivities();
  }, [tripId, toast, fetchActivities, trip]);

  useEffect(() => {
    fetchLinks();
  }, [tripId, toast, fetchLinks]);

  useEffect(() => {
    fetchTrip();
  }, [tripId, toast, fetchTrip]);

  useEffect(() => {
    fetchParticipants();
  }, [tripId, toast, participantId, fetchParticipants]);

  useEffect(() => {
    if (participantId) {
      openConfirmParticipationModal();
    }
  }, [participantId]);

  async function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;

    const { status } = await api.post(`/trips/${tripId}/invites`, {
      email,
    });

    if (status === 201) {
      setEmailsToInvite([...emailsToInvite, email]);
    }
  }

  function removeEmailToInvite(emailToRemove: string) {
    setEmailsToInvite(
      emailsToInvite.filter((email) => email !== emailToRemove),
    );
  }

  const displayedDate = trip
    ? format(new Date(trip.starts_at), "d 'de' LLL")
        .concat(' até ')
        .concat(format(new Date(trip.ends_at), "d 'de' LLL"))
    : null;

  return (
    <>
      {loading && <Loading />}
      <div className="max-w-6xl px-6 py-10 lg:mx-auto space-y-8">
        <DestinationAndDateHeader
          openUpdateTripModal={openUpdateTripModal}
          trip={trip as Trip}
          setTrip={setTrip}
        />

        <main className="flex flex-col lg:flex-row gap-16 px-4">
          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-semibold">Atividades</h2>
              <Button onClick={openCreateActivityModal} variant="lime">
                <Plus className="text-lime-950 size-5" />
                <span className="hidden lg:inline">Cadastrar atividade</span>
              </Button>
            </div>

            <Activities activities={activities} setActivities={setActivities} />
          </div>
          <div className="lg:w-80 space-y-6">
            <ImportantLinks
              openCreateLinkModal={openCreateLinkModal}
              linksImportants={linksImportants}
              setLinksImportants={setLinksImportants}
            />

            <div className="w-full h-px bg-zinc-800" />

            <Guests
              openInviteGuestsModal={openInviteGuestsModal}
              participants={participants}
              setParticipants={setParticipants}
            />
          </div>
        </main>

        {isCreateActivityModalOpen && (
          <CreateActivityModal
            isCreateActivityModalOpen={isCreateActivityModalOpen}
            closeCreateActivityModal={closeCreateActivityModal}
            loading={loading}
            setLoading={setLoading}
            fetchActivities={fetchActivities}
          />
        )}

        {isCreateLinkModalOpen && (
          <CreateLinkModal
            isCreateLinkModalOpen={isCreateLinkModalOpen}
            closeCreateLinkModal={closeCreateLinkModal}
            loading={loading}
            setLoading={setLoading}
            fetchLinks={fetchLinks}
          />
        )}

        {isUpdateTripModalOpen && (
          <UpdateTripModal
            isUpdateTripModalOpen={isUpdateTripModalOpen}
            closeUpdateTripModal={closeUpdateTripModal}
            loading={loading}
            setLoading={setLoading}
            fetchTrip={fetchTrip}
          />
        )}

        {isGuestsModalOpen && (
          <InviteGuestsModal
            isGuestsModalOpen={isGuestsModalOpen}
            closeGuestsModal={closeGuestsModal}
            emailsToInvite={emailsToInvite}
            removeEmailToInvite={removeEmailToInvite}
            addNewEmailToInvite={addNewEmailToInvite}
          />
        )}

        {participantId && isConfirmParticipationModalOpen && (
          <ConfirmParticipationModal
            isConfirmParticipationModalOpen={isConfirmParticipationModalOpen}
            closeConfirmParticipationModal={closeConfirmParticipationModal}
            destination={trip?.destination}
            displayedDate={displayedDate}
            loading={loading}
            setLoading={setLoading}
            fetchParticipants={fetchParticipants}
          />
        )}
      </div>
    </>
  );
}
