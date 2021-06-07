import { darken } from 'polished';
import styled from 'styled-components';

export const Overlay = styled.div`
  background: ${({ theme }) => theme.backgroundOverlay};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
`;

export const Modal = styled.div`
  background: ${({ theme }) => theme.colors.backgroundHeader};
  width: 100%;
  max-width: 30rem;
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.modalBoxShadow};
  text-align: center;
  position: relative;

  header {
    position: relative;
    border-radius: 5px 5px 0 0;
    width: 100%;
    text-align: center;
    padding: 5px;
    background: ${({ theme }) => theme.colors.secondary};
    margin-bottom: 10px;

    button {
      background: transparent;
      border: none;
      position: absolute;
      right: 10px;
      top: 5px;
      margin-left: 10px;
    }
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding: 10px;

    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;

      margin-top: 10px;
    }

    button {
      height: 2.75rem;
      margin: 5px 0 0;
      border: 0;
      padding: 5px;
      border-radius: 4px;

      background: ${({ theme }) => theme.colors.secondary};

      color: ${({ theme }) => theme.colors.textInput};

      font-weight: bold;
      font-size: 1rem;
      transition: background 0.2s;

      &:hover {
        background: ${({ theme }) => darken(0.03, theme.colors.secondary)};
      }

      &:disabled {
        background: ${({ theme }) => theme.colors.error};
        cursor: auto;
      }
    }
  }
`;
