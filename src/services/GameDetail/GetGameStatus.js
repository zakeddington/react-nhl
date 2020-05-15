
function GetGameStatus(linescoreData) {
	let data = linescoreData;
	let curPeriod = data.currentPeriod;
	let curPeriodName = data.currentPeriodOrdinal;
	let curTime = data.currentPeriodTimeRemaining;
	let curStatus = '';

	if (curPeriod > 0) {
		if (curTime !== 'Final') {
			curStatus = `${curPeriodName} | ${curTime}`;
		} else {
			if (curPeriod === 3) {
				curStatus = `${curTime}`;
			} else {
				curStatus = `${curTime}/${curPeriodName}`;
			}
		}
	}

	return curStatus;
}

export default GetGameStatus;
