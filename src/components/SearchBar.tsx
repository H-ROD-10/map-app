
import { ChangeEvent, useRef, useContext } from 'react';
import { PlacesContext } from '../context';
import { SearchResults } from './SearchResults';

export const SearchBar = () => {

    const {searchByQuery} = useContext(PlacesContext)

    const debounceRef = useRef<any>()

    const onQueryChanged = (event: ChangeEvent<HTMLInputElement>) =>{
      if(debounceRef.current){
        clearTimeout(debounceRef.current)
      }

      debounceRef.current = setTimeout(() => {
       searchByQuery( event.target.value )
      }, 350);
    }


  return (
    <div className='search-container'>     
        <input 
            type="text" 
            placeholder='Buscar Direccion'
            className='form-control'
            onChange={ onQueryChanged }
        />

        <SearchResults/>
    </div>
  )
}
