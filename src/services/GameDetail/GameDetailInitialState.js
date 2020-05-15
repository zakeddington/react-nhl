
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

export const GameStatsInitialState = {
	gameStats: [],
}

export const PeriodSummaryInitialState = {
	periodSummary: [],
}
