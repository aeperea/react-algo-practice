import {useState} from 'react';
import useLocalStorageState from './useLocalStorageState';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useLocalStorageState('persistedValue', '');

  const onChange = (e) => {
    console.log('e.target.value', e.target.value);
    setInputValue(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setValue(inputValue);
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label for="value">Value to store in local storage:</label>
        <input type="text" id="value" name="value" value={inputValue} onChange={onChange} />
        <input type="submit" value="Submit" />
      </form>
      <div>The current value is {value}</div>
    </div>
  );
}
