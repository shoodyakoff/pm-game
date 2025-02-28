import { render } from '@testing-library/react';
import { createDndTestUtils } from './dnd-test-utils';

export const setupTest = () => {
  const dndUtils = createDndTestUtils();
  
  return {
    ...dndUtils,
    render
  };
}; 