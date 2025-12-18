import {useState} from 'react';
import StarRating from './StarRating';
import './styles.css';

export default function App() {
  const [rating, setRating] = useState(0);
  return (
    <div>
      <StarRating rating={rating} onChange={setRating} />
    </div>
  );
}
