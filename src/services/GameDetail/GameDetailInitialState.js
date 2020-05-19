
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

// TODO: refactor stats
// rename GameStats > Team Stats
// rename TeamStats > Player Stats
// clarify initial state objects
export const GameStatsInitialState = {
	gameStats: [],
}

export const PlayerStatsInitialState = {
	playerStats: [],
}

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
