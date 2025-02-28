import { setupTest } from '../../../testing/test-utils';

describe('Basic Test Example', () => {
  const utils = setupTest();

  it('should demonstrate basic test setup', () => {
    utils.renderWithDnd(<TestComponent />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
}); 