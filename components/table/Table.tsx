/* eslint-disable react/jsx-key */
import React, { use, useMemo } from 'react'
import styles from "./table.module.scss"
import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { ITable } from './ITable';
import { IPokemonId } from '@/globalTypes';

const Table = ({ querySearch, setStateForm }: ITable) => {
  const queryClient = useQueryClient()

  const deletePost = useMutation((id: number) => {
    return axios.delete(`https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/pkm-msa-evaluation/pokemon/${ id }`);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pokemons'] })
    }
  });

  const { isLoading, data: pokemonData } = useQuery('pokemons', () =>
    fetch('https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/pkm-msa-evaluation/pokemon/?idAuthor=1').then(res =>
      res.json()
    )
  )

  const handleEdit = (id: number) => {
    setStateForm({ pokemonId: id, isEditing: true, isCreating: false })
  }

  const pokeData = useMemo(() => {
    if (querySearch && querySearch.length >= 2) {
      return pokemonData.filter((ele: any) => ele.name.toLowerCase().includes(querySearch.toLowerCase()))
    }
    return pokemonData
  }, [querySearch, pokemonData])

  if (isLoading) return <div>...Loading</div>

  return (
    <div className={ styles.tableWrap }>
      <table className={ styles.table }>
        <thead>
          <tr>
            <th>Name</th>
            <th>Imagen</th>
            <th>Ataque</th>
            <th>Defensa</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          { pokeData?.map((pokemon: IPokemonId, rowIndex: number) => {
            return (
              <tr key={ `tr-${ rowIndex }` }>
                <td>{ pokemon.name }</td>
                <td><img src={ pokemon.image } height="50" width="50" /></td>
                <td>{ pokemon.attack }</td>
                <td>{ pokemon.defense }</td>
                <td>
                  <FiEdit3 className={ styles.icon } onClick={ () => handleEdit(pokemon.id) } />
                  <MdDeleteForever className={ styles.icon } onClick={ () => deletePost.mutate(pokemon.id) } />
                </td>
              </tr>
            );
          }) }
        </tbody>
      </table>
    </div >
  );
};


export default Table
