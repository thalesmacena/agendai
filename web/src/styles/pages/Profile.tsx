import { darken, lighten } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  height: 100%;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;

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

    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
      margin: 10px 0 20px;
    }

    button {
      margin: 5px 0 20px;
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
  }
`;
