import GetStatsGoalie from './GetStatsGoalie';
import GetStatsSkater from './GetStatsSkater';

function GetStatsTotal(data, position) {
	if (data.length) {
		data[0].stat.goalAgainstAverage = (Math.round(data[0].stat.goalAgainstAverage * 100) / 100).toFixed(2);
		data[0].stat.savePercentage = (Math.round(data[0].stat.savePercentage * 1000) / 1000).toFixed(3);
		let curStats;

		if (position === 'G') {
			curStats = GetStatsGoalie(data[0].stat);
		} else {
			curStats = GetStatsSkater(data[0].stat);
		}

		return {
			season: 'Total',
			rowClass: 'total',
			team: '',
			...curStats,
		};
	}

	return null;
}

export default GetStatsTotal;
