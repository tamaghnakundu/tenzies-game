export default function Dice({ value, isHeld, holdDice }) {
  const styles = {
    backgroundColor: isHeld ? "#59E391" : "white",
  };

  return (
    <button className="dice" style={styles} onClick={holdDice}>
      {value}
    </button>
  );
}
