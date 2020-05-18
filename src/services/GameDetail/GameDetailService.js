import CONSTANTS from '../../config/Constants';
import API from '../API';

import GetGameStatus from './GetGameStatus';
import GetPeriodStats from './GetPeriodStats';
import GetStarStats from './GetStarStats';
import GetTeamGameStats from './GetTeamGameStats';
import GetShootoutPlays from './GetShootoutPlays';
import GetScoringPlays from './GetScoringPlays';
import GetPenaltyPlays from './GetPenaltyPlays';
import GetPlayerStats from './GetPlayerStats';

import {
	GameDetailInitialState,
	GameHeaderInitialState,
	ScoreBoardInitialState,
	StarsInitialState,
	GameStatsInitialState,
	PeriodSummaryInitialState,
} from './GameDetailInitialState';

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

		return Object.assign(GameHeaderInitialState, {
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
		});
	},

	async processScoreBoardData(data) {
		const periodGoals = data.liveData.linescore.periods;
		const shootoutGoals = data.liveData.linescore.shootoutInfo;
		const awayScore = data.liveData.linescore.teams.away.goals;
		const homeScore = data.liveData.linescore.teams.home.goals;
		const periods = GetPeriodStats(periodGoals, awayScore, homeScore, shootoutGoals);

		return Object.assign(ScoreBoardInitialState, {
			awayTeam: {
				id: data.gameData.teams.away.id,
				name: data.gameData.teams.away.teamName,
			},
			homeTeam: {
				id: data.gameData.teams.home.id,
				name: data.gameData.teams.home.teamName,
			},
			periodGoals: periods,
		});
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

		return Object.assign(StarsInitialState, {
			stars: curStars,
		});
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

		return Object.assign(PeriodSummaryInitialState, {
			periodSummary: periodPlays,
		});
	},

	async processGameStatsData(data) {
		const awayTeam = data.gameData.teams.away;
		const homeTeam = data.gameData.teams.home;
		const awayBoxscore = data.liveData.boxscore.teams.away.teamStats.teamSkaterStats;
		const homeBoxscore = data.liveData.boxscore.teams.home.teamStats.teamSkaterStats;
		const awayGameStats = GetTeamGameStats(awayTeam, awayBoxscore);
		const homeGameStats = GetTeamGameStats(homeTeam, homeBoxscore);

		return Object.assign(GameStatsInitialState, {
			gameStats: [awayGameStats, homeGameStats],
		});
	},

	async processTeamStats(data) {
		const awayPlayers = data.liveData.boxscore.teams.away.players;
		const homePlayers = data.liveData.boxscore.teams.home.players;
		const awayStats = GetPlayerStats(awayPlayers);
		const homeStats = GetPlayerStats(homePlayers);

		return {
			teamStats: [
				{
					id: data.gameData.teams.away.id,
					name: data.gameData.teams.away.name,
					stats: awayStats,
				},
				{
					id: data.gameData.teams.home.id,
					name: data.gameData.teams.home.name,
					stats: homeStats,
				}
			]
		};
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
						const curItem = this.createVideoData(item.items[0]);

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
				const curItem = this.createVideoData(item);
				videos.push(curItem);
			});
		}

		return {
			title,
			desc,
			poster,
			posterAltText,
			videos,
		};
	},

	createVideoData(data) {
		// console.log(data);
		const title = data.title;
		const playbacks = data.playbacks;
		const duration = data.duration;
		const thumb = data.image.cuts['640x360'].src;
		const poster = data.image.cuts['1136x640'].src;
		const posterAltText = data.image.altText;
		const mp4s = [];
		let url = '';

		playbacks.forEach((video) => {
			if (video.url.includes('.mp4')) {
				mp4s.push(video.url);
			}

			if (video.name.includes('1800K')) {
				url = video.url;
			}
		});

		if (!url && mp4s.length) {
			url = mp4s[mp4s.length - 1];
		}

		return {
			title,
			duration,
			url,
			poster,
			thumb,
			posterAltText,
			showVideoPlayer: false,
		};
	},
}

export default GameDetailService;
