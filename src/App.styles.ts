import IconButton from "@material-ui/core/IconButton";
import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 6rem;
`;

export const CartButton = styled(IconButton)`
  position: fixed;
  z-index: 100;
  right: 20px;
  top: 20px;
  align-self: flex-end;
`;

export const CenterButtonWrapper = styled.div`
  margin: 4rem;
  text-align: center;

  button {
    background-color: ${(props) => props.theme.colors.primary} !important;
    color: #fff !important;
    border: none;
    border-radius: 0.5rem;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 0 auto;

    &:hover {
      background-color: ${(props) => props.theme.colors.secundary};
    }
  }
`;
