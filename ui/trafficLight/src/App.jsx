import TrafficLight from './TrafficLight';

// R -> G -> Y -> G...
// - Red light: 4000ms
// - Yellow light: 500ms
// - Green light: 3000ms

const colorConfig = {
  red: {
    backgroundColor: 'red',
    duration: 4000,
    next: 'green',
  },
  yellow: {
    backgroundColor: 'yellow',
    duration: 500,
    next: 'red',
  },
  green: {
    backgroundColor: 'green',
    duration: 3000,
    next: 'yellow',
  },
};

export default function App() {
  return (
    <div>
      <TrafficLight
        initialColor="red"
        colorConfig={colorConfig}
      />
      <br />
      <TrafficLight
        initialColor="red"
        colorConfig={colorConfig}
        layout="vertical"
      />
    </div>
  );
}
