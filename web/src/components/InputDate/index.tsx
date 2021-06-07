import { useField } from '@unform/core';
import { setHours, setMinutes } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { useEffect, useRef, useState } from 'react';
import ReactDatePicker, {
  ReactDatePickerProps,
  registerLocale
} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Props extends Omit<ReactDatePickerProps, 'onChange'> {
  name: string;
}
export default function DatePicker({ name, ...rest }: Props) {
  const datepickerRef = useRef(null);
  const { fieldName, registerField, defaultValue } = useField(name);
  const [date, setDate] = useState(defaultValue || null);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datepickerRef.current,
      path: 'props.selected',
      clearValue: (ref: any) => {
        ref.clear();
      }
    });
  }, [fieldName, registerField]);

  registerLocale('pt', pt);

  return (
    <ReactDatePicker
      ref={datepickerRef}
      selected={date}
      showTimeSelect
      locale="pt"
      dateFormat="Pp"
      timeFormat="p"
      timeIntervals={60}
      onChange={setDate}
      showTimeSelectOnly
      excludeTimes={[
        setHours(setMinutes(new Date(), 0), 0),
        setHours(setMinutes(new Date(), 0), 1),
        setHours(setMinutes(new Date(), 0), 2),
        setHours(setMinutes(new Date(), 0), 3),
        setHours(setMinutes(new Date(), 0), 4),
        setHours(setMinutes(new Date(), 0), 5),
        setHours(setMinutes(new Date(), 0), 6),
        setHours(setMinutes(new Date(), 0), 7),
        setHours(setMinutes(new Date(), 0), 8),
        setHours(setMinutes(new Date(), 0), 9),
        setHours(setMinutes(new Date(), 0), 15),
        setHours(setMinutes(new Date(), 0), 16),
        setHours(setMinutes(new Date(), 0), 17),
        setHours(setMinutes(new Date(), 0), 22),
        setHours(setMinutes(new Date(), 0), 23)
      ]}
      {...rest}
    />
  );
}
