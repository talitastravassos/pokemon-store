import IconButton from "@material-ui/core/IconButton";
import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  top: 0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  width: 100%;
  height: 4rem;

  background-color: red;
`;

export const CartButton = styled(IconButton)`
  z-index: 100;
  right: 1rem;
  top: 1rem;
  align-self: flex-end;
`;
