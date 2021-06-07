import { darken } from 'polished';
import styled from 'styled-components';

export const Content = styled.div``;

export const CardapioContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CardapioHeader = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface IRefeicaoSwitch {
  isDay: boolean;
}

export const RefeicaoSwitch = styled.button<IRefeicaoSwitch>`
  margin: 5px 0 0;
  border: 0;
  border-radius: 4px;

  width: 150px;
  height: 2.75rem;
  margin-bottom: 15px;

  background: ${({ theme, isDay }) =>
    isDay ? theme.colors.secondary : theme.colors.primary};

  font-weight: bold;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textInput};

  transition: background 0.2s;

  &:hover {
    background: ${({ theme, isDay }) =>
      isDay
        ? darken(0.03, theme.colors.secondary)
        : darken(0.03, theme.colors.primary)};
  }
`;

export const CardapioList = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: stretch;
`;
