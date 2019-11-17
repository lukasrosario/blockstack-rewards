export default class Business {
	constructor(usersession) {
		this.user = usersession;
	}

	verifydata() {
		return this.user.loadUserData();
	}

	async addReward(rewardName, points) {
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

	deleteReward(rewardName) {
		//TODO
		let rewards = this.user.getFile("/rewards.json", {decrypt: true});
 		delete rewards[rewardName];
 		this.user.putFile("/rewards.json", rewards, {encrypt: true});
	}

	updateRewardPoints(rewardName, newPoints) {
		//TODO
		let updatedReward = {rewardName: newPoints},
			rewards = this.user.getFile("/rewards.json", {decrypt: true}); 
		delete rewards[rewardName];
		let localRewards = JSON.parse(rewards); 
		localRewards.push(updatedReward); 
		this.user.putFile("/rewards.json", JSON.stringify(localRewards), {encrypt: true});
	}

	giveCustomerPoints(cuid, points) {
		//TODO
		let newCustomerPointsobj = {cuid: points},
			customerPoints = this.user.getFile("/users.json", {decrypt: true});
		delete customerPoints[cuid];
		let localCustomerPoints = JSON.parse(customerPoints);
		localCustomerPoints.push(newCustomerPointsobj );
		this.user.putFile("users.json", JSON.stringify(localCustomerPoints), {encrypt: true});
	}

	async getRewards() {
		let rewards = await this.user.getFile("/rewards.json", {decrypt: true});
		rewards = JSON.parse(rewards);
		return rewards;
	}
}
