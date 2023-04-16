import { IStateForm } from "@/pages/IHome";

export interface IHeader {
  onInput?: (e: React.FormEvent<HTMLInputElement>) => void,
  setStateForm: ({ pokemonId, isCreating, isEditing }: IStateForm) => void
}
