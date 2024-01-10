import gameList from ".."

class RoundManager {
    constructor(k, rounds, sendResult) {
        this.k = k
        this.rounds = rounds
        this.sendResult = sendResult
    }
    roundNum = 0
    startTime = 0
    results = []

    run() {
        this.startTime = Date.now()
        this.k.go(
            this.currentGame(),
            this.currentRound().settings
        )
    }

    currentRound() {
        return this.rounds[this.roundNum]
    }
    currentGame() {
        return gameList[this.currentRound().game_id].tag
    }

    nextRound() {
        this.roundNum++

        if (this.roundNum >= this.rounds.length) {
            console.log('moveToFinish');
            this.k.quit()
            this.sendResult(this.results)
            console.log('res', this.results);
            return
        }
        this.run()
    }
    finishFunc = (success = false, reason) => {
        const { k, results, startTime, roundNum } = this

        if (results.length > roundNum) { return }

        const roundId = this.currentRound().id
        const finishTime = Date.now() - startTime

        results.push({ roundId, success, finishTime })

        console.log('תוצאות', results);
        k.wait(0.2, () => {

            if (success) {
                k.go('success', { time: finishTime })

            } else {
                k.go('failure', { reason })
            }
        })
    }

}


export default RoundManager