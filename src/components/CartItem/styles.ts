import Button from "@material-ui/core/Button";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  text-align: center;
  border-bottom: 1px solid lightblue;
  /* padding-bottom: 20px; */
  padding: 1rem 0;
  h3 {
    padding: 1rem 0;
  }
  div {
    flex: 1;
  }
  .information,
  .buttons {
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
  }
  img {
    object-fit: contain;
    margin-left: 40px;
  }

  @media (max-width: 700px) {
    width: 100%;
  }
`;

export const CartButtonWrapper = styled(Button)`
  background-color: ${(props) => props.theme.colors.primary} !important;
  color: #fff !important;
  border: none;
  border-radius: 0.5rem;
  color: white;
  padding: 15px 32px;
  text-decoration: none;
  font-size: 16px;

  &:hover {
    background-color: ${(props) => props.theme.colors.secundary};
  }
`;
