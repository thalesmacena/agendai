import { api } from '@/services/api';
import { useEffect, useState } from 'react';
import ScheduleModal from '../ScheduleModal';
import {
  AgendarButton,
  UnityContainer,
  UnityScheduleListContainer
} from './styles';

const UnitySchedulesList = () => {
  const [unities, setUnities] = useState([]);
  const [selectUnity, setSelectUnity] = useState({});

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const getUnitiesCapacity = async () => {
      const { data } = await api.get('/unity');

      setUnities(data);
    };

    getUnitiesCapacity();
  }, []);

  const handleVisible = (unity) => {
    setSelectUnity(unity);
    setIsVisible(!isVisible);
  };

  return (
    <>
      <UnityScheduleListContainer>
        {unities.map((unity) => (
          <UnityContainer key={unity.id}>
            <header>
              <strong>{unity.name}</strong>
            </header>
            <div>
              <p>
                <strong>Lotação por horário</strong>
                <span>{unity.capacity}</span>
              </p>
              <AgendarButton type="button" onClick={() => handleVisible(unity)}>
                Agendar
              </AgendarButton>
            </div>
          </UnityContainer>
        ))}
      </UnityScheduleListContainer>
      {isVisible && (
        <ScheduleModal closeModal={handleVisible} unity={selectUnity} />
      )}
    </>
  );
};

export default UnitySchedulesList;
