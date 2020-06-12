import * as moment from 'moment';
import CONSTANTS from '../../config/Constants';
import API from '../API';
import GetStats from './GetStats';

class PlayerDetailService {

	async getPlayerData(playerId) {
		return await API.getPlayerDetail(playerId);
	}

	async processPlayerDetailHeroData(playerData) {
		const data = playerData.people[0];
		const id = data.id;
		const birthDate = moment(data.birthDate).format(CONSTANTS.momentOptions.birthFormat);
		const birthCity = data.birthCity;
		const birthState = data.birthStateProvince;
		let birthPlace = data.birthCountry;

		if (birthState) {
			birthPlace = `${birthState}, ${birthPlace}`;
		}

		if (birthCity) {
			birthPlace = `${birthCity}, ${birthPlace}`;
		}

		const heroImg = `${CONSTANTS.imgUrl.player.base}${CONSTANTS.imgUrl.player.hero}${data.id}${CONSTANTS.imgUrl.player.ext}`;
		const arenaImg = `${CONSTANTS.imgUrl.player.base}${CONSTANTS.imgUrl.player.arena}${data.currentTeam.id}${CONSTANTS.imgUrl.player.ext}`;
		const validateHeroImg = new Image();

		let results = {
			age: data.currentAge,
			birthDate,
			birthPlace,
			height: data.height,
			heroImg,
			id,
			name: data.fullName,
			number: data.primaryNumber,
			pos: data.primaryPosition.abbreviation,
			shoots: data.shootsCatches,
			weight: data.weight,
		}

		validateHeroImg.src = heroImg;

		return new Promise((resolve, reject) => {
			try {
				validateHeroImg.onerror = () => {
					results.heroImg = arenaImg;
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

	async processPlayerDetailStats(playerData) {
		const data = playerData.people[0];
		const stats = data.stats;
		const position = data.primaryPosition.abbreviation;

		const results = {
			playerPosition: position,
			playerDetailStatsByType: GetStats(stats, position),
		};

		return results;
	}
}

export default new PlayerDetailService();
