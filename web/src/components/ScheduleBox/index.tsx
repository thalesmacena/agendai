import { api } from '@/services/api';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { CancelButton, ScheduleBoxContainer } from './styles';

interface IUnity {
  id: string;
  name: string;
}

interface ISchedule {
  id: string;
  date: string;
  cancellable: boolean;
  unity: IUnity;
}

interface IUser {
  id: number;
  token: string;
}

interface IScheduleBoxProps {
  schedule: ISchedule;
  user: IUser;
}

const ScheduleBox = ({ schedule, user }: IScheduleBoxProps) => {
  api.defaults.headers.Authorization = `Bearer ${user.token}`;

  const Router = useRouter();

  const date = useMemo(() => {
    return format(parseISO(schedule.date), "dd 'de' MMM', às' H:mm'h'", {
      locale: pt
    });
  }, [schedule]);

  const handleCancel = () => {
    api.delete(`./schedules/${schedule.id}`);

    Router.push('/');
  };

  return (
    <ScheduleBoxContainer>
      <header>
        <strong>Agendamento marcado</strong>
      </header>
      <main>
        <p>
          <strong>Unidade</strong>
          <span>{schedule.unity.name}</span>
        </p>
        <p>
          <strong>Data</strong>
          <span>{date}</span>
        </p>
        <CancelButton type="button" onClick={handleCancel}>
          Cancelar Agendamento
        </CancelButton>
      </main>
    </ScheduleBoxContainer>
  );
};

export default ScheduleBox;
