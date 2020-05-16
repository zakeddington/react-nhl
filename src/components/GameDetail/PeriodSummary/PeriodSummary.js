import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../../Shared/Loader/Loader';
import ErrorMessage from '../../Shared/ErrorMessage/ErrorMessage';
import PeriodSummaryGoal from './PeriodSummaryGoal';
import PeriodSummaryPenalty from './PeriodSummaryPenalty';
import './PeriodSummary.scss';
import PeriodSummaryShootoutPlay from "./PenaltySummaryShootoutPlay";

function renderShootoutPlays(period) {
	return period.shootoutPlays.map((play, i) => {
		const {
			shooter,
			isGoal,
			shotResult,
			teamId,
		} = play;

		return (
			<PeriodSummaryShootoutPlay
				key={`shootout-${i}`}
				shooter={shooter}
				isGoal={isGoal}
				shotResult={shotResult}
				teamId={teamId}
			/>
		)
	});
}

function renderContent(props) {
	const { periodSummary	} = props;

	const periods = periodSummary.map((period) => {
		if (period.shootoutPlays.length) {
			let shootoutPlays = renderShootoutPlays(period);
			return (
				<div key={period.periodName} className="period-summary-period">
					<h3 className="period-summary-title">{period.periodName}</h3>
					{shootoutPlays}
				</div>
			)
		}

		let goals = period.goals.map((goal) => {
			const {
				time,
				isEmptyNet,
				goalType,
				teamId,
				awayScore,
				homeScore,
				scorer,
				assists,
			} = goal;

			return (
				<PeriodSummaryGoal
					key={time}
					time={time}
					isEmptyNet={isEmptyNet}
					goalType={goalType}
					teamId={teamId}
					awayScore={awayScore}
					homeScore={homeScore}
					scorer={scorer}
					assists={assists}
				/>
			)
		});

		if (!goals.length) {
			goals =
				<div className="period-summary-item">
					<div className="period-summary-empty">No Goals</div>
				</div>;
		}

		let penalties = period.penalties.map((penalty, i) => {
			const {
				time,
				teamId,
				penaltyOn,
				penaltyType,
				penaltyMin,
			} = penalty;

			return (
				<PeriodSummaryPenalty
					key={`${time}-${i}`}
					time={time}
					teamId={teamId}
					penaltyOn={penaltyOn}
					penaltyType={penaltyType}
					penaltyMin={penaltyMin}
				/>
			)
		});

		if (!penalties.length) {
			penalties =
				<div className="period-summary-item">
					<div className="period-summary-empty">No Penalties</div>
				</div>;
		}

		return (
			<div key={period.periodName} className="period-summary-period">
				<h3 className="period-summary-title">{period.periodName}</h3>
				<div className="period-summary-subtitle">Goals</div>
				{goals}
				<div className="period-summary-subtitle">Penalties</div>
				{penalties}
			</div>
		)
	});

	return (
		<div className="period-summary">
			{periods}
		</div>
	)
}

function PeriodSummary(props) {
	const {
		showLoader,
		showNoResults,
	} = props;
	let content;

	if (showLoader) {
		content = <Loader/>;
	} else {
		if (showNoResults) {
			content = <ErrorMessage errorMsg="No period summary available."/>;
		} else {
			content = renderContent(props);
		}
	}

	return (
		<>
			{content}
		</>
	)
}

PeriodSummary.propTypes = {
	showLoader: PropTypes.bool,
	showNoResults: PropTypes.bool,
	periodSummary: PropTypes.arrayOf(PropTypes.shape({
		periodName: PropTypes.string,
		goals: PropTypes.array,
		penalties: PropTypes.array,
		shootoutPlays: PropTypes.array,
	})),
}

export default PeriodSummary;
