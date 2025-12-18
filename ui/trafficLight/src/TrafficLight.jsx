import {useState, useEffect} from 'react';
import classNames from 'classnames';
import styles from './styles.module.css';

function Light({color}) {
  return <div
    className={classNames(styles.light, styles[color])}
    />
}

export default function TrafficLight({
  initialColor = 'red',
  colorConfig,
  layout = 'horizontal',
}) {
  const [currentColor, setCurrentColor] = useState(initialColor);

  useEffect(() => {
    const {duration, next} = colorConfig[currentColor];
    const timeoutId = setTimeout(() => {
      setCurrentColor(next);
    }, duration);
    return () => {
      clearTimeout(timeoutId);
    }
  }, [currentColor]);

  return (
  <div className={styles.wrapper}>
    <div
      className={
        layout === 'horizontal'
        ? styles.TrafficLightHorizontal
        : styles.TrafficLightVertical
      }>
        {Object.keys(colorConfig).map((color) => (
          <Light
            key={color}
            color={
              color === currentColor
                ? colorConfig[color].backgroundColor
                : undefined
            }
          />
        ))}
    </div>
  </div>
  )
}
