import styled from 'styled-components';

export const CardapioSectionContainer = styled.div`
  width: 175px;
  margin-right: 0.8rem;

  background: ${({ theme }) => theme.backgroundModal};
  box-shadow: ${({ theme }) => theme.boxShadowModal};
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: ${({ theme }) => theme.borderModal};

  display: flex;
  flex-direction: column;

  align-items: center;

  div {
    font-size: 0.8rem;
    padding: 5px;

    p {
      display: flex;
      margin-bottom: 8px;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  }
`;

interface ICardapioHeader {
  isAlmoco: boolean;
}

export const CardapioHeader = styled.header<ICardapioHeader>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;

  color: ${({ theme, isAlmoco }) =>
    isAlmoco ? theme.colors.strongInHeader : theme.colors.textInHeader};

  border-radius: 10px 10px 0 0;
  background-color: ${({ theme, isAlmoco }) =>
    isAlmoco ? theme.colors.secondary : theme.colors.primary};
`;
