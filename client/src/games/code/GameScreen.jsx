
import kaboom from "kaboom"
import * as React from "react"
import debugToggle from "./middleWares/debug"
import './game-screen.css'
import successScene from "../scenes/success"
import failureScene from "../scenes/failure"
import BASE_URL from "../../BASEURL";
import gameList from ".."
import RoundManager from "./roundManager"
import roundNumScene from "../scenes/roundNum"



function GameScreen({ rounds, sendResults }) {
	const canvasRef = React.useRef(null)
	const runAlready = React.useRef(false)

	React.useEffect(() => {
		if (!rounds) { return }

		// run once management
		if (runAlready.current) { return }
		runAlready.current = true

		// define kaboom
		const k = kaboom({
			stretch: true,
			background: '#000000',
			global: false,
			canvas: canvasRef.current,
			width: 1920,
			height: 1080,
			letterbox: true,

		})

		///--🖼️--Assets Loader--🔊-----

		const allAssets = [
			['Font', 'Abraham', `${BASE_URL}/assets/fonts/Abraham-Regular.ttf`],
		]

		// push every asset from each game in the room
		for (const round of rounds) {
			const game = gameList[round.game_id]
			game.assets.forEach(asset => allAssets.push(asset))
			// create scene for each game
			game.createScene(k)
		}

		// load all assets
		allAssets.forEach((asset) => {
			const [type, tag, url] = asset
			console.log('check for loading', tag);

			const theAssetsIsExist = k[`get${type}`](tag)
			if (theAssetsIsExist) { return }

			k[`load${type}`](tag, url)
			console.info('loaded', tag);
		})
		///-----------------

		k.onUpdate(() => { k.setCursor("default") })

		const roundManager = new RoundManager(k, rounds, sendResults)

		k.finish = roundManager.finishFunc

		successScene(k, () => roundManager.nextRound())
		failureScene(k, () => roundManager.nextRound())
		roundNumScene(k, () => { console.log('next'); })


		debugToggle(k)

		//TESTING
		k.onLoad(() => {
			roundManager.run()
		})

		// return (() => {
		// 	k.destroyAll()
		// })


	}, [rounds, sendResults])

	return <div className="canvas-container" style={{ minHeight: '80vh' }}>
		<canvas ref={canvasRef} ></canvas>
	</div>

}

export default GameScreen

