export default function Die(prpos) {
    const styles = {
        backgroundColor: prpos.isHeld ? "#59E391" : "white"
    }
    return (
        <div className="die-face" style={styles} onClick={prpos.holdDice} >
            <h2 className="die-nums" >{prpos.value}</h2>
        </div>
    )
}