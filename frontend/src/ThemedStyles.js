import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

export const P = styled.p`
  color: ${props => props.color};
  font-family: 'SnesFont';
`;

export const Div = styled.div`
  color: ${props => props.color};
  font-family: 'SnesFont';

`;

export const A = styled.a`
  color: ${props => props.color};
  font-family: 'SnesFont';
`;

export const H1 = styled.h1`
  color: ${props => props.color};
  font-family: 'SnesFont';
`;

export const H2 = styled.h2`
  color: ${props => props.color};
  font-family: 'SnesFont';
`;

export const AlertText = styled.h2`
  color: ${props => props.alertColor};
  font-family: 'SnesFont';
  text-shadow: 0 0 4px ${props => props.alertColor}, 0 0 10px ${props => props.alertColor}, 0 0 200px ${props => props.alertColor}, 0 0 300px ${props => props.alertColor}; // glow
`;

export const Input = styled.input`
  color: ${props => props.color};
  font-family: 'SnesFont';
  text-shadow: 0 0 4px ${props => props.color}, 0 0 10px ${props => props.color}, 0 0 200px ${props => props.color}, 0 0 300px ${props => props.color}; // glow
`;

export const StyledTerminal = styled.div`
  text-align: left;
  background-color: ${props => props.backgroundColor};
  font-family: 'SnesFont';
  min-height: 100vh;
  text-shadow: 0 0 4px ${props => props.color}, 0 0 10px ${props => props.color}, 0 0 200px ${props => props.color}, 0 0 300px ${props => props.color}; // glow
  font-size: large;
  line-height: 3em;
`

const Styledthemes = () => {
  const [color, backgroundColor] = useSelector((state) => [state.theme.color, state.theme.backgroundColor])

  return (
    <StyledTerminal backgroundColor={backgroundColor}>
      <P color={color}>This is a styled paragraph.</P>
      <Div color={color}>This is a styled div.</Div>
      <A href="#" color={color}>This is a styled link.</A>
      <H1 color={color}>This is a styled heading.</H1>
    </StyledTerminal>
  );
};

export default Styledthemes;
