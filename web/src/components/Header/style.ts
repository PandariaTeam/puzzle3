import { css } from '@emotion/css';

export const headerCls = css`
  background-color: #282c34;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  &-logo {
    height: 40px;
    pointer-events: none;
  }
`;
