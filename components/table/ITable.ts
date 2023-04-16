import { IStateForm } from "@/pages/IHome";

export interface ITable {
  querySearch?: string,
  setStateForm: ({ pokemonId, isEditing, isCreating }: IStateForm) => void
}
