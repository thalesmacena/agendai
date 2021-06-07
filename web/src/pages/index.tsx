import CardapioSection from '@/components/CardapioSection';
import DefaultLayout from '@/components/LayoutDefault';
import { ruApi } from '@/services/api';
import {
  CardapioContainer,
  CardapioHeader,
  CardapioList,
  RefeicaoSwitch
} from '@/styles/pages/Home';
import { GetStaticProps } from 'next';
import { useMemo, useState } from 'react';

interface IRefeicao {
  id: number;
  day: string;
  entrada: string;
  principal: string;
  vegano: string;
  guarnicao: string;
  acompanhamento: string;
  sobremesa: string;
  refresco: string;
  weekday: string;
}

interface IDay {
  almoco: IRefeicao;
  janta: IRefeicao;
}

interface ICardapioProps {
  refeicoes: IDay[];
}

const Index = ({ refeicoes }: ICardapioProps) => {
  const [isAlmoco, setIsAlmoco] = useState(true);

  const refeicao = useMemo(() => {
    const newRefeicao = refeicoes.map((day) => {
      return isAlmoco ? day.almoco : day.janta;
    });

    return newRefeicao;
  }, [refeicoes, isAlmoco]);

  const changeRefeicaoType = () => {
    setIsAlmoco(!isAlmoco);
  };

  return (
    <DefaultLayout>
      <CardapioContainer>
        <CardapioHeader>
          <RefeicaoSwitch
            onClick={changeRefeicaoType}
            type="button"
            isDay={isAlmoco}
          >
            {isAlmoco ? 'Almoço' : 'Jantar'}
          </RefeicaoSwitch>
        </CardapioHeader>
        <CardapioList>
          {refeicao.map((day: IRefeicao) => (
            <CardapioSection key={day.id} refeicao={day} isAlmoco={isAlmoco} />
          ))}
        </CardapioList>
      </CardapioContainer>
    </DefaultLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await ruApi.get(`/ufrj`);

  return {
    props: {
      refeicoes: data
    },
    revalidate: 60 * 60 * 24 // 24h
  };
};

export default Index;
