
function GetPeriodStats(periodGoals, awayScore, homeScore, shootoutGoals) {
	let periods = [];
	let periodsTotal = ['T', awayScore, homeScore];

	if (periodGoals.length) {
		periodGoals.forEach((period) => {
			let curPeriod = [];
			let periodName = period.ordinalNum;
			let awayGoals = period.away.goals;
			let homeGoals = period.home.goals;

			if (periodName === 'OT') {
				if (awayGoals + homeGoals <= 0) {
					curPeriod.push('SO');
					curPeriod.push(shootoutGoals.away.scores);
					curPeriod.push(shootoutGoals.home.scores);
				} else {
					curPeriod.push(periodName);
					curPeriod.push(awayGoals);
					curPeriod.push(homeGoals);
				}
			} else {
				curPeriod.push(periodName);
				curPeriod.push(awayGoals);
				curPeriod.push(homeGoals);
			}

			periods.push(curPeriod);
		});

		periods.push(periodsTotal);
	}

	return periods;
}

export default GetPeriodStats;
