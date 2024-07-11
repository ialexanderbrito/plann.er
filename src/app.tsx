import { FormEvent, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import {
  MapPin,
  Calendar,
  ArrowRight,
  UserRoundPlus,
  Settings2,
  X,
  AtSign,
  Plus,
} from 'lucide-react';

export function App() {
  const { toast } = useToast();

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([
    'eu@ialexanderbrito.dev',
    'ak@fk.com',
  ]);

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

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="w-full max-w-3xl px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-4">
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className="flex items-center gap-2 flex-1">
              <MapPin className="text-zinc-400 size-5" />
              <input
                type="text"
                disabled={isGuestsInputOpen}
                placeholder="Para onde você vai?"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              />
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="text-zinc-400 size-5" />
              <input
                type="text"
                disabled={isGuestsInputOpen}
                placeholder="Quando?"
                className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none"
              />
            </div>

            <div className="w-px h-6 bg-zinc-800" />

            {isGuestsInputOpen ? (
              <Button
                onClick={closeGuestsInput}
                className="bg-zinc-800 text-zinc-200 px-5 py-2 font-medium items-center gap-2 flex hover:bg-zinc-700"
              >
                Alterar local/data
                <Settings2 className="text-zinc-200 size-5" />
              </Button>
            ) : (
              <Button
                onClick={openGuestsInput}
                className="bg-lime-300 text-lime-950 px-5 py-2 font-medium items-center gap-2 flex hover:bg-lime-400"
              >
                Continuar
                <ArrowRight className="text-lime-950 size-5" />
              </Button>
            )}
          </div>

          {isGuestsInputOpen && (
            <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
              <Button
                onClick={openGuestsModal}
                className="flex p-0 items-center gap-2 flex-1 bg-transparent hover:bg-transparent "
              >
                <UserRoundPlus className="text-zinc-400 size-5" />
                <span className="text-zinc-400 flex-1 text-left text-lg font-normal">
                  Quem estará na viagem?
                </span>
              </Button>

              <div className="w-px h-6 bg-zinc-800" />

              <Button className="bg-lime-300 text-lime-950 px-5 py-2 font-medium items-center gap-2 flex hover:bg-lime-400">
                Confirmar viagem
                <ArrowRight className="text-lime-950 size-5" />
              </Button>
            </div>
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
            plicitcas de provicidade
          </a>
          .
        </p>
      </div>

      {isGuestsModalOpen && (
        <Dialog open={isGuestsModalOpen} onOpenChange={closeGuestsModal}>
          <DialogContent className="bg-zinc-900 border-zinc-800 max-w-fit">
            <DialogHeader>
              <h2 className="text-lg font-semibold">Selecionar convidados</h2>
            </DialogHeader>
            <p className="text-sm text-zinc-400">
              Os convidados irão receber e-mails para confirmar a participação
              na viagem.
            </p>
            <div className="flex flex-wrap gap-2">
              {emailsToInvite.map((email) => (
                <div
                  key={email}
                  className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
                >
                  <span className="text-zinc-300">{email}</span>
                  <Button
                    variant="link"
                    type="button"
                    size="icon"
                    className="size-4"
                  >
                    <X
                      onClick={() => removeEmailToInvite(email)}
                      className="text-zinc-400 size-4"
                    />
                  </Button>
                </div>
              ))}
            </div>

            <div className="w-full h-px bg-zinc-800" />

            <form
              onSubmit={addNewEmailToInvite}
              className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2"
            >
              <div className="px-2 flex items-center flex-1 gap-2">
                <AtSign className="text-zinc-400 size-5" />
                <input
                  type="email"
                  name="email"
                  placeholder="Digite o e-mail do convidado"
                  className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none"
                />
              </div>

              <Button
                type="submit"
                className="bg-lime-300 text-lime-950 px-5 py-2 font-medium items-center gap-2 flex hover:bg-lime-400"
              >
                Convidar
                <Plus className="text-lime-950 size-5" />
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
