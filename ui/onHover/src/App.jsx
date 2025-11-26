import {useState, useEffect, useRef} from 'react';

function useHover() {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleEnter = () => setHovered(true);
    const handleLeave = () => setHovered(false);

    node.addEventListener("mouseenter", handleEnter);
    node.addEventListener("mouseleave", handleLeave);

    return () => {
      node.removeEventListener("mouseenter", handleEnter);
      node.removeEventListener("mouseleave", handleLeave);
    };
  }, [setHovered]);

  return [ref, hovered];
}

export default function App() {
  const [ref, hovered] = useHover();

  return (
    <div>
      <div ref={ref}>{hovered ? "Hovered" : "Not hovered"}</div>
      <div>Some other stuff</div>
    </div>
  );
}
