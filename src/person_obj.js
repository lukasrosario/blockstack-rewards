

export default class Business
{

	constructor( usersession )
	{
		this.user = usersession;
	}

	verifydata() {
		return this.user.loadUserData();
	}

	async addReward(rewardName, points)
	{
		try {
			let rewards = await this.user.getFile("/rewards.json", {decrypt: true}),
					newReward = {};
			newReward[rewardName] = points;
			rewards = JSON.parse(rewards);
			rewards.push( newReward );
			await this.user.putFile("/rewards.json", JSON.stringify( rewards ), {encrypt: true});
			return;
		}
		catch(error) {
			console.log(error);
			let initReward = {};
			initReward[rewardName] = points;
			this.user.putFile("/rewards.json", JSON.stringify( [initReward] ), {encrypt: true});
		}

	}

	deleteReward(rewardName)
	{
		let rewards = this.user.getFile("/rewards.json", {decrypt: true}); // parses the class rewards from the json file on the gaia server and sets the current instance rewards to this

 		delete rewards[rewardName]; // delete the reward from the JSON string directly

 		this.user.putFile("/rewards.json", rewards, {encrypt: true}); // put the JSON back onto the server
	}

	updateRewardPoints(rewardName, newPoints)
	{
		let updatedReward = {rewardName: newPoints}; // new reward object with the correct new points

		let rewards = this.user.getFile("/rewards.json", {decrypt: true}); // read the current reward object off of the server

		delete rewards[rewardName]; // delete the reward that was stored in JSON directly

		var local_rewards = JSON.parse(rewards); // parse the JSON into a local representation of the object rewards

		local_rewards.push( updatedReward ); // push the updated reward onto the pared JSON string that's now just an object

		this.user.putFile("/rewards.json", JSON.stringify( rewards ), {encrypt: true}); // store the stringified JSON onto the same location on the server as before.
	}

	giveCustomerPoints( cuid, points)
	{
		let newCustomerPointsobj = { cuid: points }; // new replacement cuid / points object

		let customerPoints = this.user.getFile("/users.json", {decrypt: true}); // customer points as a JSON

		delete customerPoints[cuid]; // delete the old value of the cuid / points object

		var localCustomerPoints = JSON.parse( customerPoints ); // change the JSON into a local object

		localCustomerPoints.push( newCustomerPointsobj ); // add the replacement cuid / points object

		this.user.putFile("users.json", JSON.stringify(localCustomerPoints), {encrypt: true}); // put the JSON back onto the server.
	}

	async getRewards()
	{
		let rewards = await this.user.getFile("/rewards.json", {decrypt: true});
		rewards = JSON.parse(rewards);
		return rewards;
	}
}
