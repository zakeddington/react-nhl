import GetStatsGoalie from './GetStatsGoalie';
import GetStatsSkater from './GetStatsSkater';

function GetStatsSeasons(data, position) {
	const stats = [];

	data.forEach((item) => {
		if (item.league.id === 133) {
			let season = item.season;
			season = season.substring(0, 4) + '-' + season.substring(4);
			let curStats;

			if (position === 'G') {
				curStats = GetStatsGoalie(item.stat);
			} else {
				curStats = GetStatsSkater(item.stat);
			}

			const results = {
				season,
				rowClass: '',
				team: item.team.abbreviation,
				...curStats,
			};

			stats.push(results);
		}
	});

	return stats;
}

export default GetStatsSeasons;
