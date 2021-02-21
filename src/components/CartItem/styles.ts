import Button from "@material-ui/core/Button";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
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
