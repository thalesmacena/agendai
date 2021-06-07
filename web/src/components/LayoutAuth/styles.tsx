import { darken, lighten } from 'polished';
import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 19.6rem;
  text-align: center;

  img {
    width: 250px;
    cursor: pointer;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 1.875rem;

    input {
      background: ${({ theme }) => theme.inputBackground};
      border: 0;
      border-radius: 4px;
      height: 2.75rem;
      padding: 0 0.9rem;
      color: ${({ theme }) => theme.colors.error};
      margin: 0 0 0.625rem;
      border: 2px solid transparent;

      &:focus {
        border-color: ${({ theme }) => lighten(0.03, theme.colors.primary)};
      }

      &::placeholder {
        color: ${({ theme }) => theme.placeholder};
      }
    }

    span {
      color: ${({ theme }) => theme.colors.error};
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      margin: 5px 0 0;
      height: 2.75rem;
      background: ${({ theme }) => theme.colors.primary};
      font-weight: bold;
      color: ${({ theme }) => theme.colors.textInput};
      border: 0;
      border-radius: 4px;
      font-size: 1rem;
      transition: background 0.2s;

      &:hover {
        background: ${({ theme }) => darken(0.03, theme.colors.primary)};
      }

      &:disabled {
        background: ${({ theme }) => theme.colors.error};
        cursor: auto;
      }
    }

    a {
      color: ${({ theme }) => theme.colors.primary};
      margin-top: 15px;
      font-size: 1rem;
      opacity: 0.8;

      &hover {
        opacity: 1;
      }
    }
  }
`;
