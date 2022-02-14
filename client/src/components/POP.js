const calculatePop = (pop, zero) => {
  const chance = Math.round(pop * 10) * 10;

  if (chance > 20) return `${chance}%`;

  if (zero === true) return `${chance}%`;

  return;
};

export default function POP({ pop, zero }) {
  return <span className="pop-component">{calculatePop(pop, zero)}</span>;
}
