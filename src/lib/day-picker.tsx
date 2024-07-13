import * as React from 'react';
import {
  DayPicker as OriDayPicker,
  DayPickerDefaultProps,
} from 'react-day-picker';

export const DayPicker = (
  props: React.ComponentPropsWithoutRef<typeof OriDayPicker>,
) => <OriDayPicker classNames={classNames} {...props} />;

const classNames: DayPickerDefaultProps['classNames'] = {
  cell: 'w-10 h-10 align-middle text-center border-0 px-0',
  day_selected: 'text-lime-950 bg-lime-300 hover:bg-lime-400',
  day_today: 'font-bold',
  day_disabled:
    'opacity-25 hover:bg-lime-400 active:bg-lime-400 active:text-lime-950',
  day_outside: 'enabled:opacity-50',
  day_range_middle: 'rounded-none',
  day_hidden: 'hidden',
};
