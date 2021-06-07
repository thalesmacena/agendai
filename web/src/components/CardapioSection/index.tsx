import { CardapioHeader, CardapioSectionContainer } from './styles';

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

interface ICardapioSection {
  refeicao: IRefeicao;
  isAlmoco: boolean;
}

const CardapioSection = ({ refeicao, isAlmoco }: ICardapioSection) => {
  return (
    <CardapioSectionContainer>
      <CardapioHeader isAlmoco={isAlmoco}>
        <strong>{refeicao.weekday}</strong>
        <span>{refeicao.day}</span>
      </CardapioHeader>
      <div>
        <p>
          <strong>Entrada</strong>
          <span>{refeicao.entrada}</span>
        </p>

        <p>
          <strong>Principal</strong>
          <span>{refeicao.principal}</span>
        </p>

        <p>
          <strong>Vegano</strong>
          <span>{refeicao.vegano}</span>
        </p>

        <p>
          <strong>Guarnição</strong>
          <span>{refeicao.guarnicao}</span>
        </p>

        <p>
          <strong>Acompanhamento</strong>
          <span>{refeicao.acompanhamento}</span>
        </p>

        <p>
          <strong>Sobremesa</strong>
          <span>{refeicao.sobremesa}</span>
        </p>

        <p>
          <strong>Refresco</strong>
          <span>{refeicao.refresco}</span>
        </p>
      </div>
    </CardapioSectionContainer>
  );
};

export default CardapioSection;
