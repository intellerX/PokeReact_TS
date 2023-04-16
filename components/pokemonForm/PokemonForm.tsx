import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import Button from "../button/Button";
import { useEffect, useId } from "react";
import { IPokemonForm, schema, formData } from "./IPokemonForm";

import styles from "./PokemonForm.module.scss";
import { useQuery } from "react-query";

export default function PokemonForm ({ pokemonId, onSubmit, stateForm, setStateForm }: IPokemonForm) {
  const uniqId = useId();

  const { data: pokemonData } = useQuery('pokemonSelected', () =>
    fetch(`https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/pkm-msa-evaluation/pokemon/${ pokemonId }`).then(res =>
      res.json()
    ), { enabled: !Number.isNaN(pokemonId) && stateForm.isEditing }
  )

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<formData>({
    resolver: yupResolver(schema)
  });

  const submitPokeData = (data: formData) => {
    const pokeData = { ...data, idAuthor: 1 }
    onSubmit(pokeData)
  }

  const handleCancel = () => {
    setStateForm({ pokemonId: NaN, isEditing: false, isCreating: false })
  }

  useEffect(() => {
    if (pokemonData && stateForm.isEditing) {
      reset(pokemonData)
    }
  }, [pokemonData, stateForm])

  return (
    <form onSubmit={ handleSubmit(submitPokeData) } className={ styles.form }>
      <h2 className={ styles.title }>{ stateForm.isCreating ? "Nuevo Pokemón" : "Editar Pokemón" }</h2>
      <div className={ styles.container }>
        <div className={ styles.leftform }>
          <div className={ styles.inputContainer }>
            <label>Nombre: </label>
            <input  { ...register("name") } className={ styles.input } placeholder="Nombre" />
            <p>{ errors.name?.message }</p>
          </div>

          <div className={ styles.inputContainer }>
            <label>Imagen: </label>
            <input  { ...register("image") } className={ styles.input } placeholder="Url" />
            <p>{ errors.image?.message }</p>
          </div>

          <div className={ styles.inputContainer }>
            <label>Tipo: </label>
            <input  { ...register("type") } className={ styles.input } placeholder="Tipo" />
            <p>{ errors.type?.type }</p>
          </div>
        </div>
        <div className={ styles.rightform }>
          <div className={ styles.sliderContainer }>
            <label>Ataque: </label>
            <p>
              <label htmlFor={ uniqId }>0</label>
              <input type="range" min={ 0 } max={ 100 } { ...register("attack") } className={ styles.slider } />
              <label htmlFor={ uniqId }>100</label>
            </p>
            <p>{ errors.attack?.message }</p>
          </div>

          <div className={ styles.sliderContainer }>
            <label>Defensa: </label>
            <p>
              <label htmlFor={ uniqId }>0</label>
              <input type="range" min={ 0 } max={ 100 } { ...register("defense") } className={ styles.slider } />
              <label htmlFor={ uniqId }>100</label>
            </p>
            <p>{ errors.defense?.message }</p>
          </div>

          <div className={ styles.sliderContainer }>
            <label>HP: </label>
            <p>
              <label htmlFor={ uniqId }>0</label>
              <input type="range" min={ 0 } max={ 100 } { ...register("hp") } className={ styles.slider } />
              <label htmlFor={ uniqId }>100</label>
            </p>
            <p>{ errors.defense?.message }</p>
          </div>
        </div>
      </div>
      <div className={ styles.bottomContainer }>
        <Button type="submit">Guardar</Button>
        <Button onClick={ () => handleCancel() } >Cancelar</Button>
      </div>
    </form >
  );
}
