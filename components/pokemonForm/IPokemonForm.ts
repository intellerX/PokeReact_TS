import { IPokemon, IPokemonId } from "@/globalTypes";
import { IStateForm } from "@/pages/IHome";
import * as yup from "yup";

export const schema = yup.object({
  name: yup.string().required(),
  attack: yup.number().positive().integer().required(),
  defense: yup.number().positive().integer().required(),
  image: yup.string().required(),
  hp: yup.number().positive().integer().required(),
  type: yup.string().required(),
}).required();

export type formData = yup.InferType<typeof schema>;

export interface IPokemonForm {
  pokemonId?: number;
  onSubmit: (data: IPokemon | IPokemonId) => void;
  stateForm: IStateForm;
  setStateForm: ({ pokemonId, isEditing, isCreating }: IStateForm) => void
}
