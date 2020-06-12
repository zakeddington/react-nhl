
function GetBoxscoreTeam(team = {}, boxscore = {}) {
	return {
		id: team.id,
		name: team.teamName,
		shots: boxscore.shots,
		faceOffWinPercentage: boxscore.faceOffWinPercentage,
		powerPlayGoals: boxscore.powerPlayGoals,
		powerPlayOpportunities: boxscore.powerPlayOpportunities,
		pim: boxscore.pim,
		hits: boxscore.hits,
		blocked: boxscore.blocked,
		giveaways: boxscore.giveaways,
		takeaways: boxscore.takeaways,
	}
}

export default GetBoxscoreTeam;
