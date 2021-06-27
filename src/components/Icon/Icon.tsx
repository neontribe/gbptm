import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from '@emotion/styled';
import { color } from 'styled-system';
import { createPropTypes } from '@styled-system/prop-types';

const Icon = styled(FontAwesomeIcon)`
  ${color}
`;

Icon.propTypes = {
  ...createPropTypes(color.propNames),
};

/** @component */
export default Icon;
