import { setupTest } from '../../../testing/test-utils';
import { mockCharacters } from '../../../testing/mocks/character-mocks';

describe('Rendering Test Example', () => {
  const utils = setupTest();
  const mockCharacter = mockCharacters[0];

  it('should demonstrate component rendering', () => {
    utils.renderWithDnd(
      <CharacterCard 
        character={mockCharacter}
        onSelect={jest.fn()}
      />
    );

    // Проверка рендеринга
    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.type)).toBeInTheDocument();
    expect(screen.getByRole('button')).not.toBeDisabled();
  });
}); 