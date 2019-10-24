// services are state-less
// they act as utility facades that abstract the details for complex operations
// normally, our interface to any sort of server API will be as a service

import CONSTANTS from '../config/Constants';
import API from './API';
import UTILS from './Utils';

class GameDetailService {

	async getGameData(gameId) {
		return await API.getGame(gameId);
	}

	async processGameData(data) {
    const periodGoals = data.liveData.linescore.periods;
    const shootoutGoals = data.liveData.linescore.shootoutInfo;
    const boxscoreTeams = data.liveData.boxscore.teams;
    const stars = data.liveData.decisions;

    const date = new Date(data.gameData.datetime.dateTime);
    const curDate = date.toLocaleDateString(CONSTANTS.lang, CONSTANTS.dateOptions);
    const startTime = date.toLocaleTimeString(CONSTANTS.lang, CONSTANTS.timeOptions);
    const awayScore = data.liveData.linescore.teams.away.goals;
    const homeScore = data.liveData.linescore.teams.home.goals;
    const periods = UTILS.getPeriodStats(periodGoals, awayScore, homeScore, shootoutGoals);
    const gameStatus = UTILS.getGameStatus(data.liveData.linescore);
    let curStars;
    let curStatus;
    let isPreview = true;

    if (gameStatus.length) {
      curStatus = gameStatus;
      isPreview = false;
    } else {
      curStatus = startTime;
    }

    if (Object.keys(stars).length) {
      const firstStar = UTILS.getStarStats(stars.firstStar, boxscoreTeams);
      const secondStar = UTILS.getStarStats(stars.secondStar, boxscoreTeams);
      const thirdStar = UTILS.getStarStats(stars.thirdStar, boxscoreTeams);

      curStars = [firstStar, secondStar, thirdStar];
    }

    return {
      isPreview,
      date: curDate,
      gameStatus: curStatus,
      periodGoals: periods,
      teams: {
        away: {
          id: data.gameData.teams.away.id,
          city: data.gameData.teams.away.locationName,
          name: data.gameData.teams.away.teamName,
          score: awayScore,
        },
        home: {
          id: data.gameData.teams.home.id,
          city: data.gameData.teams.home.locationName,
          name: data.gameData.teams.home.teamName,
          score: homeScore,
        }
      },
      stars: curStars,
      boxscoreTeams,
    };
  }

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

    return periodPlays;
  }

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
	}

  async getGameContent(gameId) {
    return await API.getGameContent(gameId);
  }

  async processGameContent(data) {
    const previewData = data.editorial.preview.items[0];
    const recapData = data.editorial.recap.items[0];
    const mediaData = data.media.epg;

    let isRecap = false;
    let title;
    let desc;
    let poster;
    let posterAltText;
    let recapVideo;
    let recapPoster;

    if (previewData) {
      title = previewData.headline;
      desc = previewData.seoDescription;
      poster = previewData.media.image.cuts['1284x722'].src;
      posterAltText = previewData.media.image.altText;
    }

    if (recapData) {
      isRecap = true;
      title = recapData.headline;
      desc = recapData.seoDescription;

      mediaData.forEach((item) => {
        if (item.title === 'Recap') {
          let videos = item.items[0].playbacks;
          recapPoster = item.items[0].image.cuts['1136x640'].src;

          videos.forEach((video) => {
            if (video.name === 'FLASH_1800K_960X540') {
              recapVideo = video.url;
            }
          });
        }
      });
    }

    return {
      isRecap,
      title,
      desc,
      poster,
      posterAltText,
      recapVideo,
      recapPoster,
    };
  }
}

export default new GameDetailService();
