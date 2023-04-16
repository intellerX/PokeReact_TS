import Button from '@/components/button/Button';
import TextField from '@/components/textfield/TextField';
import styles from "./header.module.scss";
import { IHeader } from './IHeader';

const Header = ({ onInput, setStateForm }: IHeader) => {
  const plus = '➕';
  return (
    <div className={ styles.container }>
      <TextField placeholder="Search" icon="🔍" onInput={ onInput } />
      <Button icon={ plus } onClick={ () => setStateForm({ isCreating: true, isEditing: false, pokemonId: NaN }) } >Nuevo</Button>
    </div>
  );
};

export default Header;
