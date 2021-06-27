import styled from '@emotion/styled';

/** @visibleName Visually Hidden */
const VisuallyHidden = styled.div`
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  padding: 0;
  border: 0;
  height: 1px;
  width: 1px;
  overflow: hidden;
`;

/** @component */
export default VisuallyHidden;
