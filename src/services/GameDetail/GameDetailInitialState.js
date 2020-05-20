
export const GameDetailInitialState = {
	showLoader: true,
	isPreview: true,
	gameDate: '',
	gameStatus: '',
}

export const GameHeaderInitialState = {
	awayTeam: {
		id: null,
		city: null,
		name: null,
		score: null,
	},
	homeTeam: {
		id: null,
		city: null,
		name: null,
		score: null,
	},
}

export const ScoreBoardInitialState = {
	awayTeam: {
		id: null,
		name: null,
	},
	homeTeam: {
		id: null,
		name: null,
	},
	periodGoals: [],
}

export const StarsInitialState = {
	stars: [],
}

export const PeriodSummaryInitialState = {
	periodSummary: [],
}

export const TeamStatsInitialState = {
	teamStats: [],
}

// Player Stats components
export const PlayerStatsByTeamInitialState = {
	playerStatsByTeam: [],
}

// playerStatsByTeam contains these objects for each team
export const PlayerStatsByTeamBaseInitialState = {
	id: null,
	name: '',
	playerStatsByPosition: [],
}

// playerStatsByPosition contains this for each pos (forward, defense, goalies)
export const PlayerStatsByPositionBaseInitialState = {
	position: '',
	playerStats: [],
}

// playerStats contains this + position specific stats
export const PlayerBaseStatsInitialState = {
	id: null,
	name: '',
	number: null,
	pos: '',
}

export const PlayerSkaterStatsInitialState = {
	assists: null,
	blocked: null,
	evenTimeOnIce: '',
	faceOffPercent: null,
	faceOffWins: null,
	faceoffTaken: null,
	giveaways: null,
	goals: null,
	hits: null,
	penaltyMinutes: null,
	plusMinus: null,
	powerPlayAssists: null,
	powerPlayGoals: null,
	powerPlayTimeOnIce: '',
	shortHandedAssists: null,
	shortHandedGoals: null,
	shortHandedTimeOnIce: '',
	shots: null,
	takeaways: null,
	timeOnIce: '',
}

export const PlayerGoalieStatsInitialState = {
	shots: null,
	saves: null,
	savePercent: null,
	evenSaves: null,
	evenShotsAgainst: null,
	powerPlaySaves: null,
	powerPlayShotsAgainst: null,
	shortHandedSaves: null,
	shortHandedShotsAgainst: null,
	pim: null,
	timeOnIce: null,
}
