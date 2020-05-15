import CONSTANTS from '../config/Constants';
import API from './API';
import UTILS from './Utils';

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

export const GameDetailService = {
	state: GameDetailInitialState,

	async getGameData(gameId) {
		const response = await API.getGame(gameId);

		console.log('response', response);

		Object.assign(this.state, response || {});
		console.log('this.state', this.state);

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
		const gameStatus = UTILS.getGameStatus(this.state.liveData.linescore);
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
		const periods = UTILS.getPeriodStats(periodGoals, awayScore, homeScore, shootoutGoals);

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
			const firstStar = UTILS.getStarStats(stars.firstStar, boxscoreTeams);
			const secondStar = UTILS.getStarStats(stars.secondStar, boxscoreTeams);
			const thirdStar = UTILS.getStarStats(stars.thirdStar, boxscoreTeams);

			curStars = [firstStar, secondStar, thirdStar];
		}

		return Object.assign(StarsInitialState, {
			stars: curStars,
		});
	},

	async processGameStatsData(data) {
		const awayTeam = data.gameData.teams.away;
		const homeTeam = data.gameData.teams.home;
		const awayBoxscore = data.liveData.boxscore.teams.away.teamStats.teamSkaterStats;
		const homeBoxscore = data.liveData.boxscore.teams.home.teamStats.teamSkaterStats;
		const awayGameStats = UTILS.getTeamGameStats(awayTeam, awayBoxscore);
		const homeGameStats = UTILS.getTeamGameStats(homeTeam, homeBoxscore);

		return Object.assign(GameStatsInitialState, {
			gameStats: [awayGameStats, homeGameStats],
		});
	},

	async processPeriodSummary(data) {
		const periods = data.liveData.linescore.periods;
		const scoringIds = data.liveData.plays.scoringPlays;
		const penaltyIds = data.liveData.plays.penaltyPlays;
		const allPlays = data.liveData.plays.allPlays;
		const hasShootout = data.liveData.linescore.hasShootout;
		const teamAwayId = data.gameData.teams.away.id;
		const teamHomeId = data.gameData.teams.home.id;

		let periodPlays = [];

		periods.forEach((period) => {
			let periodName = period.ordinalNum === 'OT' ? 'Overtime' : `${period.ordinalNum} Period`;

			periodPlays.push({
				periodName,
				goals: [],
				penalties: [],
				shootoutPlays: [],
			});
		});

		scoringIds.forEach((id) => {
			const curPlay = allPlays[id];
			const curPeriodIndex = curPlay.about.period - 1;
			const scoringTeamId = curPlay.team.id;
			let curScorer = {};
			let curAssists = [];

			if (curPeriodIndex < periods.length) {
				curPlay.players.forEach((player) => {
					if (player.playerType === 'Scorer') {
						curScorer = {
							id: player.player.id,
							name: player.player.fullName,
							total: player.seasonTotal,
							desc: curPlay.result.secondaryType,
						}
					}

					if (player.playerType === 'Assist') {
						curAssists.push({
							id: player.player.id,
							name: player.player.fullName,
							total: player.seasonTotal,
						})
					}
				});

				const playDetail = {
					time: curPlay.about.periodTime,
					isEmptyNet: curPlay.result.emptyNet,
					goalType: curPlay.result.strength.code,
					teamId: scoringTeamId,
					score: {
						away: {
							name: data.gameData.teams.away.triCode,
							goals: curPlay.about.goals.away,
							isScoringTeam: scoringTeamId === teamAwayId,
						},
						home: {
							name: data.gameData.teams.home.triCode,
							goals: curPlay.about.goals.home,
							isScoringTeam: scoringTeamId === teamHomeId,
						},
					},
					scorer: curScorer,
					assists: curAssists
				};

				periodPlays[curPeriodIndex].goals.push(playDetail);
			}
		});

		penaltyIds.forEach((id) => {
			const curPlay = allPlays[id];
			const curPeriodIndex = curPlay.about.period - 1;
			const penaltyTeamId = curPlay.team.id;
			let curPenaltyOn = {};

			if (curPeriodIndex < periods.length) {
				curPlay.players.forEach((player) => {
					if (player.playerType === 'PenaltyOn') {
						curPenaltyOn = {
							id: player.player.id,
							name: player.player.fullName,
						}
					}
				});

				const playDetail = {
					time: curPlay.about.periodTime,
					teamId: penaltyTeamId,
					penaltyOn: curPenaltyOn,
					penaltyType: curPlay.result.secondaryType,
					penaltyMin: curPlay.result.penaltyMinutes,
				};

				periodPlays[curPeriodIndex].penalties.push(playDetail);
			}
		});

		if (hasShootout) {
			const shootoutPlays = this.getShootoutSummary(data);
			periodPlays.push({
				periodName: 'Shootout',
				goals: [],
				penalties: [],
				shootoutPlays,
			});
		}

		if (periodPlays.length) {
			return periodPlays;
		}

		return CONSTANTS.NO_DATA;
	},

	getShootoutSummary(data) {
		const playsByPeriod = data.liveData.plays.playsByPeriod;
		const playIds = playsByPeriod[4].plays;
		const allPlays = data.liveData.plays.allPlays;
		const shootoutPlays = [];

		playIds.forEach((id) => {
			let curPlay = allPlays[id];
			let curShooter;

			if (curPlay.players) {
				const shootingTeamId = curPlay.team.id;
				let isGoal = false;
				let shotResult = '';

				switch (curPlay.result.event) {
					case 'Goal':
						isGoal = true;
						shotResult = 'Goal';
						break;
					case 'Shot':
						shotResult = 'Save';
						break;
					case 'Missed Shot':
						shotResult = 'Miss';
						break;
					default:
						break;
				}

				curPlay.players.forEach((player) => {
					if (player.playerType === 'Scorer' || player.playerType === 'Shooter') {
						curShooter = {
							id: player.player.id,
							name: player.player.fullName,
							desc: curPlay.result.secondaryType,
						}
					}
				});

				let playDetail = {
					shooter: curShooter,
					isGoal,
					shotResult,
					teamId: shootingTeamId,
				};

				shootoutPlays.push(playDetail);
			}
		});

		return shootoutPlays;
	},

	async processTeamStats(data) {
		const awayPlayers = data.liveData.boxscore.teams.away.players;
		const homePlayers = data.liveData.boxscore.teams.home.players;
		const awayStats = this.createPlayerData(awayPlayers);
		const homeStats = this.createPlayerData(homePlayers);
		const gameStatus = UTILS.getGameStatus(data.liveData.linescore);
		const isPreview = !gameStatus.length;
		const showNoResults = (!awayStats && !homeStats);

		return {
			showNoResults,
			isPreview,
			teams: [
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

	createPlayerData(players) {
		const stats = [];
		const forwards = [];
		const defense = [];
		const goalies = [];

		Object.keys(players).forEach((key) => {
			const player = players[key];
			if (Object.keys(player.stats).length) {
				const playerData = {
					id: player.person.id,
					number: player.jerseyNumber,
					name: player.person.fullName,
					pos: player.position.abbreviation,
				};

				switch (player.position.code) {
					case 'D':
						defense.push(
							Object.assign({
								stats: this.getStatPercent(player.stats.skaterStats, 'faceOffWins', 'faceoffTaken', 'faceOffPercent'),
							}, playerData)
						);
						break;
					case 'G':
						goalies.push(
							Object.assign({
								stats: this.getSavePercent(player.stats.goalieStats, 'saves', 'shots', 'savePercent'),
							}, playerData)
						);
						break;
					default:
						forwards.push(
							Object.assign({
								stats: this.getStatPercent(player.stats.skaterStats, 'faceOffWins', 'faceoffTaken', 'faceOffPercent'),
							}, playerData)
						);
						break;
				}
			}
		});

		if (!forwards.length && !defense.length && !goalies.length) {
			return null;
		}

		forwards.sort((a, b) => a.number - b.number);
		defense.sort((a, b) => a.number - b.number);
		goalies.sort((a, b) => a.number - b.number);

		stats.push({
			position: 'Forwards',
			players: forwards,
		});

		stats.push({
			position: 'Defense',
			players: defense,
		});

		stats.push({
			position: 'Goalies',
			players: goalies,
		});

		return stats;
	},

	getStatPercent(playerData, winPropName, totalPropName, newProp) {
		const data = playerData;
		const wins = data[winPropName];
		const total = data[totalPropName];
		data[newProp] = '-';

		if (total) {
			data[newProp] = Math.round((wins / total) * 100);
		}

		return data;
	},

	getSavePercent(playerData, winPropName, totalPropName, newProp) {
		const data = playerData;
		const wins = data[winPropName];
		const total = data[totalPropName];
		data[newProp] = '-';

		if (total) {
			data[newProp] = Math.round((wins / total) * 1000) / 1000;
		}

		return data;
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
