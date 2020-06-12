import GetStatsSeasons from './GetStatsSeasons';
import GetStatsTotal from './GetStatsTotal';

function GetStats(data, pos) {
	let seasonStats = {
		typeName: 'Regular Season',
		statsBySeason: [],
	};
	let seasonStatsTotal = {};
	let playoffStats = {
		typeName: 'Playoffs',
		statsBySeason: [],
	};
	let playoffStatsTotal = {};

	data.forEach((stats) => {
		switch (stats.type.displayName) {
			case 'yearByYear':
				seasonStats.statsBySeason = GetStatsSeasons(stats.splits, pos);
				return;
			case 'careerRegularSeason':
				seasonStatsTotal = GetStatsTotal(stats.splits, pos);
				return;
			case 'yearByYearPlayoffs':
				playoffStats.statsBySeason = GetStatsSeasons(stats.splits, pos);
				return;
			case 'careerPlayoffs':
				playoffStatsTotal = GetStatsTotal(stats.splits, pos);
				return;
			default:
				return;
		}
	});

	if (seasonStatsTotal) {
		seasonStats.statsBySeason.push(seasonStatsTotal);
	}

	if (playoffStatsTotal) {
		playoffStats.statsBySeason.push(playoffStatsTotal);
	}

	return [seasonStats, playoffStats];
}

export default GetStats;
