import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  /* justify-content: center; */
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  border-bottom: 1px solid lightblue;
  padding-bottom: 20px;
  div {
    flex: 1;
  }
  .information,
  .buttons {
    display: flex;
    justify-content: space-between;
  }
  img {
    object-fit: contain;
    margin-left: 40px;
  }

  @media (max-width: 700px) {
    width: 100%;
  }
`;
