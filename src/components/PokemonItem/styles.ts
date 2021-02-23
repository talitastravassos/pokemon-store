import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  border: 1px solid ${(props) => props.theme.colors.primary};
  border-radius: 0.5rem;

  button {
    border-radius: 0 0 20px 20px;
    span {
      color: ${(props) => props.theme.colors.primary};
    }
    &:hover {
      background-color: ${(props) => props.theme.colors.withOpacity};
    }
  }
  img {
    height: 20rem;
    object-fit: none;
    border-radius: 20px 20px 0 0;
  }
  div {
    padding: 1rem;
    height: 100%;
  }
`;
