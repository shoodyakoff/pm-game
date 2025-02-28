import { setupTest } from '../../../testing/test-utils';

describe('DnD Test Example', () => {
  const utils = setupTest();

  it('should handle drag and drop', () => {
    utils.renderWithDnd(<DndComponent />);
    const dropZone = screen.getByTestId('drop-zone');
    const item = screen.getByTestId('draggable-item');
    utils.simulateDragDrop(item, dropZone);
  });
}); 