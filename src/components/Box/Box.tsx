import styled from '@emotion/styled';
import {
  compose,
  space,
  color,
  layout,
  flexbox,
  position,
  border,
  ColorProps,
  SpaceProps,
  FlexboxProps,
  PositionProps,
  BorderProps,
  LayoutProps,
} from 'styled-system';
import { createPropTypes } from '@styled-system/prop-types';

interface IBoxProps extends ColorProps, SpaceProps, FlexboxProps, PositionProps, BorderProps, LayoutProps {
  children: React.ReactNode;
}

// https://styled-system.com/guides/build-a-box
const Box = styled.div<IBoxProps>`${compose(space, color, layout, flexbox, position, border)}
  // ensures the Box can shrink below its minimum content size when used as a flex item
  min-width: 0;
`


/** @component */
export default Box;
