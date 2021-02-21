import styled from "styled-components";

export const Container = styled.div`
  height: 4rem;
  background: ${(props) => props.theme.colors.primary};
  color: #fff;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;

  div {
    display: flex;
    align-items: center;
  }
`;
