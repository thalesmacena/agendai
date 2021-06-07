import DefaultLayout from '@/components/LayoutDefault';
import ScheduleBox from '@/components/ScheduleBox';
import UnitySchedulesList from '@/components/UnitySchedulesList';
import withSession from '@/lib/withSession';
import { api } from '@/services/api';
import { AgendamentoContainer } from '@/styles/pages/Agendamento';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

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
  dre: string;
  email: string;
  id: number;
  name: string;
  token: string;
}

interface IAgendamentoProps {
  user: IUser;
}

const Agendamento = ({ user }: IAgendamentoProps) => {
  api.defaults.headers.Authorization = `Bearer ${user.token}`;

  const [schedule, setSchedule] = useState<ISchedule>();

  useEffect(() => {
    const getSchedule = async () => {
      const { data } = await api.get(`/schedules`);

      if (data.length) {
        setSchedule(data[0]);
      }
    };

    getSchedule();
  }, []);

  return (
    <>
      <Head>
        <title>Agendamento | Agendai</title>
      </Head>
      <DefaultLayout>
        <AgendamentoContainer>
          {schedule ? (
            <ScheduleBox schedule={schedule} user={user} />
          ) : (
            <UnitySchedulesList />
          )}
        </AgendamentoContainer>
      </DefaultLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = withSession(
  async ({ req }) => {
    const user = req.session.get('user');

    if (user === undefined) {
      return {
        redirect: {
          destination: '/signin',
          permanent: false
        }
      };
    }

    return {
      props: { user: req.session.get('user') }
    };
  }
);

export default Agendamento;
