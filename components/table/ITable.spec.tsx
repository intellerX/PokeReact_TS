import React from 'react';
import { render, screen, act } from '@testing-library/react';
import axiosMock from 'axios';
import { QueryClient, useQuery, QueryClientProvider } from 'react-query';
import Table from './Table';

jest.mock('axios');
jest.mock('react-query', () => {
  const originalModule = jest.requireActual('react-query');
  return {
    ...originalModule,
    useQuery: jest.fn().mockImplementation((queryKey, queryFn) => {
      return {
        isLoading: false,
        data: [
          {
            id: 1,
            name: 'Pikachu',
            image: 'https://www.example.com/pikachu.png',
            attack: 55,
            defense: 40
          },
          {
            id: 2,
            name: 'Charmander',
            image: 'https://www.example.com/charmander.png',
            attack: 52,
            defense: 43
          }
        ]
      };
    }),
  };
});

const queryClient = new QueryClient();

describe('Table component', () => {
  beforeEach(() => {
    axiosMock.delete.mockReset();
  });

  it('renders data from API', async () => {
    render(
      <QueryClientProvider client={ queryClient }>
        <Table querySearch="" setStateForm={ () => { } } />
      </QueryClientProvider>
    );

    await act(async () => {
      // Wait for data to render
    });

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Imagen')).toBeInTheDocument();
    expect(screen.getByText('Ataque')).toBeInTheDocument();
    expect(screen.getByText('Defensa')).toBeInTheDocument();
    expect(screen.getByText('Acciones')).toBeInTheDocument();

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('55')).toBeInTheDocument();
    expect(screen.getByText('40')).toBeInTheDocument();

    expect(screen.getByText('Charmander')).toBeInTheDocument();
    expect(screen.getByText('52')).toBeInTheDocument();
    expect(screen.getByText('43')).toBeInTheDocument();
  });
});

