import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import RenderProvider from '../components/RenderProvider';
import testData from '../../cypress/mocks/testData';

describe('Testando a aplicação', () => {
  it('Testando a tabela', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
    await act(async () => {
      RenderProvider(<App />);
    });

    const inputColumns = screen.getByTestId('column-filter');
    const inputComparison = screen.getByTestId('comparison-filter');
    const inputValue = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');

    userEvent.selectOptions(inputColumns, ['population']);
    userEvent.selectOptions(inputComparison, ['maior que']);
    userEvent.type(inputValue, '3000');
    userEvent.click(buttonFilter);

    waitFor(() => expect(screen.getAllByRole('row')).toHaveLength(7));
    userEvent.clear(inputValue);
    userEvent.selectOptions(inputColumns, ['diameter']);
    userEvent.selectOptions(inputComparison, ['menor que']);
    userEvent.type(inputValue, '10000');
    userEvent.click(buttonFilter);
    waitFor(() => expect(screen.getAllByRole('row')).toHaveLength(1));
  });
});
