import { Button } from '@/components/ui/button';
import { Link2, Plus } from 'lucide-react';

export interface LinkImportant {
  id: string;
  title: string | null;
  url: string;
}

interface ImportantLinksProps {
  openCreateLinkModal: () => void;
  linksImportants: LinkImportant[];
  setLinksImportants: (linksImportants: LinkImportant[]) => void;
}

export function ImportantLinks({
  openCreateLinkModal,
  linksImportants,
  setLinksImportants,
}: ImportantLinksProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Links importantes</h2>
      <div className="space-y-5">
        {linksImportants.map((link) => (
          <div
            key={link.id}
            className="flex items-center justify-between gap-4"
          >
            <div className="space-y-1.5 lg:w-64 w-52">
              <span className="block font-medium text-zinc-100">
                {link.title}
              </span>
              <a
                target="_blank"
                rel="noreferrer"
                href={link.url}
                className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
              >
                {link.url}
              </a>
            </div>
            <Link2 className="text-zinc-400 size-5 shrink-0" />
          </div>
        ))}
      </div>

      <Button variant="zinc" size="full" onClick={() => openCreateLinkModal()}>
        <Plus className="text-zinc-200 size-5" />
        Cadastrar novo link
      </Button>
    </div>
  );
}
