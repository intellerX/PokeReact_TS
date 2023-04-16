import PokemonForm from '@/components/pokemonForm/PokemonForm'
import Table from '@/components/table/Table'
import Header from '@/containers/header/Header'
import { IPokemon, IPokemonId } from '@/globalTypes'
import axios from 'axios'
import { useCallback, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { IStateForm } from './IHome'

export default function Home () {
  const [querySearch, setQuerySearch] = useState('')
  const [modifyPokemonList, setModifyPokemonList] = useState({ isEditing: false, isCreating: false, pokemonId: NaN })
  const queryClient = useQueryClient()

  const onInput = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setQuerySearch(e.currentTarget.value)
  }, [])

  const setStateForm = useCallback(({ pokemonId, isCreating, isEditing }: IStateForm) => {
    setModifyPokemonList({ isEditing, isCreating, pokemonId: pokemonId })
  }, [])

  const createPokemonMutation = useMutation((newData: IPokemon,) => {
    return axios.post("https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/pkm-msa-evaluation/pokemon/", newData);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('pokemons')
      setModifyPokemonList({ isEditing: false, isCreating: false, pokemonId: NaN })
    }
  });

  const editPokemonMutation = useMutation((newData: IPokemonId) => {
    return axios.put(`https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/pkm-msa-evaluation/pokemon/${ newData.id }`, newData);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('pokemons')
      setModifyPokemonList({ isEditing: false, isCreating: false, pokemonId: NaN })
    }
  });

  const onSubmit = useCallback((newData: IPokemon | IPokemonId) => {
    if (modifyPokemonList.isEditing && 'id' in newData) {
      editPokemonMutation.mutate(newData)
    } else {
      createPokemonMutation.mutate(newData)
    }
  }, [modifyPokemonList.isEditing])

  return (
    <>
      <h3>Listado de Pokemón</h3>
      <Header onInput={ onInput } setStateForm={ setStateForm } />
      <Table querySearch={ querySearch } setStateForm={ setStateForm } />
      { modifyPokemonList.isEditing || modifyPokemonList.isCreating
        ? <PokemonForm setStateForm={ setStateForm } pokemonId={ modifyPokemonList.pokemonId } onSubmit={ onSubmit } stateForm={ modifyPokemonList } />
        : null
      }
    </>
  )
}
