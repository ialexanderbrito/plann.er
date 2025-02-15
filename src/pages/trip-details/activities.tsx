import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CircleCheck } from 'lucide-react';

export interface Activity {
  date: string;
  activities: {
    id: string;
    title: string;
    occurs_at: string;
  }[];
}

interface ActivitiesProps {
  activities: Activity[];
  setActivities: (activities: Activity[]) => void;
}

export function Activities({ activities, setActivities }: ActivitiesProps) {
  function convertToLocalTime(dateString: string, offset: number) {
    const date = new Date(dateString);
    const localTime = new Date(date.getTime() + offset * 60 * 60 * 1000);

    return localTime;
  }

  return (
    <div className="space-y-8">
      {activities.map((category) => (
        <div key={category.date} className="space-y-2.5">
          <div className="flex gap-2 items-baseline">
            <span className="text-xl text-zinc-300 font-semibold">
              Dia {format(category.date, 'd')}
            </span>
            <span className="text-xs text-zinc-500">
              {format(category.date, 'EEEE', { locale: ptBR })}
            </span>
          </div>
          {category.activities.length > 0 ? (
            <div className="space-y-2.5">
              {category.activities.map((activity) => (
                <div key={activity.id} className="space-y-2.5">
                  <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                    <CircleCheck className="text-lime-300 size-5" />
                    <span className="text-zinc-100">{activity.title}</span>
                    <span className="text-zinc-400 text-sm ml-auto">
                      {format(
                        convertToLocalTime(activity.occurs_at, +3),
                        'HH:mm',
                        {
                          locale: ptBR,
                        },
                      )}
                      h
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-zinc-500 text-sm">
              Nenhuma atividade cadastrada nessa data
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
