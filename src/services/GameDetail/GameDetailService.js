import CONSTANTS from '../../config/Constants';
import API from '../API';

import GetGameStatus from './GetGameStatus';
import GetPeriodStats from './GetPeriodStats';
import GetStarStats from './GetStarStats';
import GetBoxscoreTeam from './GetBoxscoreTeam';
import GetShootoutPlays from './GetShootoutPlays';
import GetScoringPlays from './GetScoringPlays';
import GetPenaltyPlays from './GetPenaltyPlays';
import GetBoxscorePlayersByTeam from './GetBoxscorePlayersByTeam';
import GetVideoData from './GetVideoData';

export const GameDetailInitialState = {
	showLoader: true,
	showGameContentLoader: true,
	isPreview: true,
	gameDate: '',
	gameStatus: '',
}

const GameDetailService = {
	state: GameDetailInitialState,

	async getGameData(gameId) {
		const response = await API.getGame(gameId);

		Object.assign(this.state, response || {});

		try {
			await this.getGameDateAndStatus();
		} catch (error) {
			console.error(error);
		}

		return this.state;
	},

	async getGameDateAndStatus() {
		const date = new Date(this.state.gameData.datetime.dateTime);
		this.state.gameDate = date.toLocaleDateString(CONSTANTS.lang, CONSTANTS.dateOptions);

		const startTime = date.toLocaleTimeString(CONSTANTS.lang, CONSTANTS.timeOptions);
		const startStatus = this.state.gameData.status.detailedState;
		const gameStatus = GetGameStatus(this.state.liveData.linescore);
		let curStatus;
		let isPreview = true;

		if (gameStatus.length) {
			curStatus = gameStatus;
			isPreview = false;
		} else if (startStatus === 'Postponed') {
			curStatus = 'PPD';
		} else {
			curStatus = startTime;
		}

		this.state.isPreview = isPreview;
		this.state.gameStatus = curStatus;
	},

	async processGameHeaderData(data) {
		const awayScore = data.liveData.linescore.teams.away.goals;
		const homeScore = data.liveData.linescore.teams.home.goals;

		return {
			awayTeam: {
				id: data.gameData.teams.away.id,
				city: data.gameData.teams.away.locationName,
				name: data.gameData.teams.away.teamName,
				score: awayScore,
			},
			homeTeam: {
				id: data.gameData.teams.home.id,
				city: data.gameData.teams.home.locationName,
				name: data.gameData.teams.home.teamName,
				score: homeScore,
			},
		}
	},

	async processScoreBoardData(data) {
		const periodGoals = data.liveData.linescore.periods;
		const shootoutGoals = data.liveData.linescore.shootoutInfo;
		const awayScore = data.liveData.linescore.teams.away.goals;
		const homeScore = data.liveData.linescore.teams.home.goals;
		const periods = GetPeriodStats(periodGoals, awayScore, homeScore, shootoutGoals);

		return {
			awayTeam: {
				id: data.gameData.teams.away.id,
				name: data.gameData.teams.away.teamName,
			},
			homeTeam: {
				id: data.gameData.teams.home.id,
				name: data.gameData.teams.home.teamName,
			},
			periodGoals: periods,
		}
	},

	async processStarsData(data) {
		const boxscoreTeams = data.liveData.boxscore.teams;
		const stars = data.liveData.decisions;
		let curStars = [];

		if (Object.keys(stars).length) {
			const firstStar = GetStarStats(stars.firstStar, boxscoreTeams);
			const secondStar = GetStarStats(stars.secondStar, boxscoreTeams);
			const thirdStar = GetStarStats(stars.thirdStar, boxscoreTeams);

			curStars = [firstStar, secondStar, thirdStar];
		}

		return curStars;
	},

	async processPeriodSummary(data) {
		const periods = data.liveData.linescore.periods;
		const scoringIds = data.liveData.plays.scoringPlays;
		const penaltyIds = data.liveData.plays.penaltyPlays;
		const allPlays = data.liveData.plays.allPlays;
		const hasShootout = data.liveData.linescore.hasShootout;
		const awayTeam = data.gameData.teams.away;
		const homeTeam = data.gameData.teams.home;

		let periodPlays = [];

		// create object for each period, ot, and shootout
		periods.forEach((period) => {
			let periodName = period.ordinalNum === 'OT' ? 'Overtime' : `${period.ordinalNum} Period`;

			periodPlays.push({
				periodName,
				goals: [],
				penalties: [],
				shootoutPlays: [],
			});
		});

		// add scoring plays for each period
		periodPlays = GetScoringPlays(periodPlays, allPlays, scoringIds, periods, awayTeam, homeTeam);

		// add penalties for each period
		periodPlays = GetPenaltyPlays(periodPlays, allPlays, penaltyIds, periods);

		// add shootout plays
		if (hasShootout) {
			const shootoutPlays = GetShootoutPlays(data);
			periodPlays.push({
				periodName: 'Shootout',
				goals: [],
				penalties: [],
				shootoutPlays,
			});
		}

		return periodPlays;
	},

	async processBoxscoreTeamsData(data) {
		const awayTeam = data.gameData.teams.away;
		const homeTeam = data.gameData.teams.home;
		const awayBoxscore = data.liveData.boxscore.teams.away.teamStats.teamSkaterStats;
		const homeBoxscore = data.liveData.boxscore.teams.home.teamStats.teamSkaterStats;
		const awayBoxscoreTeam = GetBoxscoreTeam(awayTeam, awayBoxscore);
		const homeBoxscoreTeam = GetBoxscoreTeam(homeTeam, homeBoxscore);

		return [awayBoxscoreTeam, homeBoxscoreTeam];
	},

	async processBoxscorePlayersData(data) {
		const awayTeam = data.gameData.teams.away;
		const homeTeam = data.gameData.teams.home;
		const awayPlayers = data.liveData.boxscore.teams.away.players;
		const homePlayers = data.liveData.boxscore.teams.home.players;
		const awayBoxscorePlayers = GetBoxscorePlayersByTeam(awayTeam, awayPlayers);
		const homeBoxscorePlayers = GetBoxscorePlayersByTeam(homeTeam, homePlayers);

		return [awayBoxscorePlayers, homeBoxscorePlayers];
	},

	async getGameContent(gameId) {
		return await API.getGameContent(gameId);
	},

	async processGameContent(data) {
		const previewData = data.editorial.preview.items[0];
		const recapData = data.editorial.recap.items[0];
		const mediaData = data.media.epg;
		const highlights = data.highlights.gameCenter.items;
		let title = '';
		let desc = '';
		let poster = '';
		let posterAltText = '';
		const videos = [];

		if (previewData) {
			title = previewData.headline;
			desc = previewData.seoDescription;
			poster = previewData.media.image.cuts['1284x722'].src;
			posterAltText = previewData.media.image.altText;
		}

		if (recapData) {
			title = recapData.headline;
			desc = recapData.seoDescription;
		}

		if (mediaData) {
			mediaData.forEach((item) => {
				const isRecapVideo = item.title === 'Recap';
				const isCondensedGame = item.title === 'Extended Highlights';

				if (isRecapVideo || isCondensedGame) {
					if (item.items.length) {
						const curItem = GetVideoData(item.items[0]);

						if (isCondensedGame) {
							curItem.title = 'Condensed Game';
							videos.splice(0, 0, curItem);
						} else {
							curItem.title = 'Game Recap';
							videos.push(curItem);
						}
					}
				}
			});
		}

		if (highlights) {
			highlights.forEach((item) => {
				const curItem = GetVideoData(item);
				videos.push(curItem);
			});
		}

		return {
			intro: {
				title,
				desc,
				poster,
				posterAltText,
			},
			videos,
		};
	},
}

export default GameDetailService;
