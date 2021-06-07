import useUser from '@/lib/useUser';
import { api } from '@/services/api';
import { Form } from '@unform/web';
import { useRouter } from 'next/router';
import { useContext, useRef } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { ThemeContext } from 'styled-components';
import DatePicker from '../InputDate';
import { Modal, Overlay } from './styles';

const ScheduleModal = ({ unity, closeModal }) => {
  const { user } = useUser();

  const { colors } = useContext(ThemeContext);
  const formRef = useRef(null);
  const Router = useRouter();

  const handleSubmit = async (data) => {
    try {
      api.defaults.headers.Authorization = `Bearer ${user.token}`;

      const { date } = data;

      const formatedDate = new Date(date);

      if (!date) {
        toast.error('É preciso informar um horário');
      } else {
        await api.post('/schedules', {
          unity: unity.name,
          date: formatedDate
        });

        toast.success('Agendamento efetuado com sucesso');

        Router.push('/');
        Router.push('/agendamento');
      }
    } catch {
      toast.error('Erro ao agendar, lotação esgotada');
    }
  };

  return (
    <Overlay>
      <Modal>
        <header>
          <strong>Agendamento para {unity.name}</strong>
          <button type="button" onClick={() => closeModal(unity)}>
            <AiFillCloseCircle size="20" color={colors.backgroundHeader} />
          </button>
        </header>
        <main>
          <strong>Escolha o horário</strong>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <DatePicker name="date" />
            <button type="submit">Agendar</button>
          </Form>
        </main>
      </Modal>
    </Overlay>
  );
};

export default ScheduleModal;
