// services are state-less
// they act as utility facades that abstract the details for complex operations
// normally, our interface to any sort of server API will be as a service

import * as moment from 'moment';
import CONSTANTS from '../config/Constants';
import API from './API';

class PlayerDetailService {

	async getPlayerData(playerId) {
		return await API.getPlayerDetail(playerId);
	}

	async processPlayerData(data) {
		// console.log('processPlayerData', data);
		const player = data.people[0];
		const id = data.people[0].id;
		const birthDate = moment(player.birthDate).format(CONSTANTS.momentOptions.birthFormat);
		const birthCity = player.birthCity;
		const birthState = player.birthStateProvince;
		const hero = `${CONSTANTS.imgUrl.player.base}${CONSTANTS.imgUrl.player.hero}${player.id}${CONSTANTS.imgUrl.player.ext}`;
		const arena = `${CONSTANTS.imgUrl.player.base}${CONSTANTS.imgUrl.player.arena}${player.currentTeam.id}${CONSTANTS.imgUrl.player.ext}`;
		const validateHeroImg = new Image();
		let birthPlace = player.birthCountry;

		if (birthState) {
			birthPlace = `${birthState}, ${birthPlace}`;
		}

		if (birthCity) {
			birthPlace = `${birthCity}, ${birthPlace}`;
		}

		let seasonStats = [];
		let seasonStatsTotal = {};
		let playoffStats = [];
		let playoffStatsTotal = {};

		player.stats.forEach((stats) => {
			switch (stats.type.displayName) {
				case 'yearByYear':
					seasonStats = this.createYearStats(stats.splits);
					return;
				case 'careerRegularSeason':
					seasonStatsTotal = this.createTotalStats(stats.splits);
					return;
				case 'yearByYearPlayoffs':
					playoffStats = this.createYearStats(stats.splits);
					return;
				case 'careerPlayoffs':
					playoffStatsTotal = this.createTotalStats(stats.splits);
					return;
				default:
					return;
			}
		});

		if (seasonStatsTotal) {
			seasonStats.push(seasonStatsTotal);
		}

		if (playoffStatsTotal) {
			playoffStats.push(playoffStatsTotal);
		}

		const results = {
			id,
			name: player.fullName,
			height: player.height,
			weight: player.weight,
			birthPlace,
			birthDate,
			number: player.primaryNumber,
			pos: player.primaryPosition.abbreviation,
			age: player.currentAge,
			shoots: player.shootsCatches,
			hero,
			seasonStats,
			playoffStats,
		};

		validateHeroImg.src = hero;

		return new Promise((resolve, reject) => {
			try {
				validateHeroImg.onerror = () => {
					results.hero = arena;
					resolve(results);
				};
				validateHeroImg.onload = () => {
					resolve(results);
				};
			} catch(e) {
				reject(e);
			}
		});
	}

	createYearStats(data) {
		const stats = [];

		data.forEach((item) => {
			if (item.league.id === 133) {
				let season = item.season;
				season = season.substring(0, 4) + '-' + season.substring(4);

				const results = {
					season,
					rowClass: '',
					team: {
						abbreviation: item.team.abbreviation,
						id: item.team.id,
					},
					stats: item.stat,
				};

				stats.push(results);
			}
		});

		return stats;
	}

	createTotalStats(data) {
		if (data.length) {
			data[0].stat.goalAgainstAverage = (Math.round(data[0].stat.goalAgainstAverage * 100) / 100).toFixed(2);
			data[0].stat.savePercentage = (Math.round(data[0].stat.savePercentage * 1000) / 1000).toFixed(3);
			const stats = data[0].stat;

			return {
				season: 'Total',
				rowClass: 'total',
				team: {
					abbreviation: '',
					id: '',
				},
				stats,
			};
		}

		return null;
	}
}

export default new PlayerDetailService();
