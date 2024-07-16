import { FormEvent } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { useMediaQuery } from '@/hooks/use-media-query';
import { AtSign, Plus, X } from 'lucide-react';

interface InviteGuestsModalProps {
  isGuestsModalOpen: boolean;
  closeGuestsModal: () => void;
  emailsToInvite: string[];
  removeEmailToInvite: (email: string) => void;
  addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void;
  isRemoveEmail?: boolean;
}

export function InviteGuestsModal({
  isGuestsModalOpen,
  closeGuestsModal,
  emailsToInvite,
  removeEmailToInvite,
  addNewEmailToInvite,
  isRemoveEmail,
}: InviteGuestsModalProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <>
      {isDesktop ? (
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
                  {isRemoveEmail && (
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
                  )}
                </div>
              ))}
            </div>

            <div className="w-full h-px bg-zinc-800" />

            <form
              onSubmit={addNewEmailToInvite}
              className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2"
            >
              <div className="px-2 flex items-center flex-1 gap-2">
                <Input
                  startIcon={AtSign}
                  type="email"
                  name="email"
                  placeholder="Digite o e-mail do convidado"
                  className="bg-transparent text-lg flex-1 outline-none"
                />
              </div>

              <Button type="submit" variant="lime">
                Convidar
                <Plus className="text-lime-950 size-5" />
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={isGuestsModalOpen} onOpenChange={closeGuestsModal}>
          <DrawerContent className="bg-zinc-900 border-zinc-800 max-w-fit">
            <DrawerHeader>
              <h2 className="text-lg font-semibold">Selecionar convidados</h2>
            </DrawerHeader>
            <p className="text-sm text-zinc-400 space-y-6 px-3">
              Os convidados irão receber e-mails para confirmar a participação
              na viagem.
            </p>
            <div className="flex flex-wrap gap-2 px-3 py-4">
              {emailsToInvite.map((email) => (
                <div
                  key={email}
                  className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
                >
                  <span className="text-zinc-300">{email}</span>
                  {isRemoveEmail && (
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
                  )}
                </div>
              ))}
            </div>

            <div className="w-full h-px bg-zinc-800" />

            <form
              onSubmit={addNewEmailToInvite}
              className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 mb-4"
            >
              <div className="px-2 flex items-center flex-1 gap-2">
                <Input
                  startIcon={AtSign}
                  type="email"
                  name="email"
                  placeholder="Digite o e-mail do convidado"
                  className="bg-transparent text-lg flex-1 outline-none"
                />
              </div>

              <Button type="submit" variant="lime">
                Convidar
                <Plus className="text-lime-950 size-5" />
              </Button>
            </form>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
