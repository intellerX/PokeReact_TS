import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PokemonForm from './PokemonForm';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

jest.mock('react-hook-form', () => {
  return {
    useForm: jest.fn(() => ({
      register: jest.fn(),
      handleSubmit: jest.fn(),
      formState: {
        errors: {}
      },
      setValue: jest.fn(),
      reset: jest.fn()
    }))
  };
});

jest.mock('@hookform/resolvers/yup', () => {
  return {
    yupResolver: jest.fn()
  };
});

describe('PokemonForm component', () => {
  it('should render the form', () => {
    const onSubmit = jest.fn();
    const stateForm = {
      pokemonId: NaN,
      isEditing: false,
      isCreating: false
    };
    const setStateForm = jest.fn();

    const { getByText, getByPlaceholderText } = render(
      <QueryClientProvider client={ queryClient }>
        <PokemonForm
          pokemonId={ NaN }
          onSubmit={ onSubmit }
          stateForm={ stateForm }
          setStateForm={ setStateForm }
        />
      </QueryClientProvider>
    );

    expect(getByText('Editar Pokemón')).toBeInTheDocument();
    expect(getByPlaceholderText('Nombre')).toBeInTheDocument();
    expect(getByPlaceholderText('Url')).toBeInTheDocument();
    expect(getByPlaceholderText('Tipo')).toBeInTheDocument();
    expect(getByText('Guardar')).toBeInTheDocument();
    expect(getByText('Cancelar')).toBeInTheDocument();
  });
});
