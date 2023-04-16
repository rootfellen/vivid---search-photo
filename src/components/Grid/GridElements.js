import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  border: 0.6px solid #000;
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem;
  flex: 1;
  text-align: center;
`;
