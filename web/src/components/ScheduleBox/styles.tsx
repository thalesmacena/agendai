import { darken } from 'polished';
import styled from 'styled-components';

export const ScheduleBoxContainer = styled.div`
  background: ${({ theme }) => theme.backgroundModal};
  box-shadow: ${({ theme }) => theme.boxShadowModal};
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: ${({ theme }) => theme.borderModal};

  display: flex;
  flex-direction: column;

  align-items: center;

  header {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    border-radius: 10px 10px 0 0;

    color: ${({ theme }) => theme.colors.strongInHeader};
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  main {
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

export const CancelButton = styled.button`
  height: 2.75rem;
  margin: 5px 0 0;
  border: 0;
  padding: 5px;
  border-radius: 4px;

  background: ${({ theme }) => theme.colors.red};

  color: ${({ theme }) => theme.colors.textInput};

  font-weight: bold;
  font-size: 1rem;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => darken(0.03, theme.colors.red)};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.error};
    cursor: auto;
  }
`;
