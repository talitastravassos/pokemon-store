import Button from "@material-ui/core/Button";
import styled from "styled-components";

export const Wrapper = styled.div`
  position: inherit;
  top: 18px;
  left: 20px;
  display: flex;
  justify-content: space-around;

  /* margin-top: 1rem; */
`;

export const Input = styled.input`
  font-size: 16px;
  border: solid 1px #dbdbdb;
  border-radius: 3px;
  width: 20rem;
  padding: 7px 13px;
  border-radius: 3px;
  color: #999;
  cursor: text;
  font-size: 14px;
  font-weight: 300;
  text-align: center;
  background: #fafafa;
`;

export const SearchButton = styled(Button)`
  margin-left: 1rem !important;
`;
