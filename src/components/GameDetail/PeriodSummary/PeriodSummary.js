import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../../Shared/Loader/Loader';
import ErrorMessage from '../../Shared/ErrorMessage/ErrorMessage';
import PeriodSummaryGoal from './PeriodSummaryGoal';
import PeriodSummaryPenalty from './PeriodSummaryPenalty';
import PeriodSummaryShootoutPlay from './PenaltySummaryShootoutPlay';
import {
	StyledPeriodSummary,
	Period,
	PeriodTitle,
	PeriodSubtitle,
	PeriodEmpty,
	PeriodItem,
} from './PeriodSummaryStyle';

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
				<Period key={period.periodName}>
					<PeriodTitle>{period.periodName}</PeriodTitle>
					{shootoutPlays}
				</Period>
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
				<PeriodItem>
					<PeriodEmpty>No Goals</PeriodEmpty>
				</PeriodItem>;
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
				<PeriodItem>
					<PeriodEmpty>No Penalties</PeriodEmpty>
				</PeriodItem>;
		}

		return (
			<Period key={period.periodName}>
				<PeriodTitle>{period.periodName}</PeriodTitle>
				<PeriodSubtitle>Goals</PeriodSubtitle>
				{goals}
				<PeriodSubtitle>Penalties</PeriodSubtitle>
				{penalties}
			</Period>
		)
	});

	return (
		<StyledPeriodSummary>
			{periods}
		</StyledPeriodSummary>
	)
}

function PeriodSummary(props) {
	const {
		showLoader,
		showNoResults,
	} = props;
	let content;

	if (showLoader) {
		content = <Loader />;
	} else {
		if (showNoResults) {
			content = <ErrorMessage errorMsg="No period summary available." />;
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
