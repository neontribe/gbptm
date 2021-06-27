import styled from '@emotion/styled';
import { space } from 'styled-system';
import { createPropTypes } from '@styled-system/prop-types';

const Spacer = styled.div`
  ${space}
`;

Spacer.propTypes = {
  ...createPropTypes(space.propNames),
};

/** @component */
export default Spacer;
