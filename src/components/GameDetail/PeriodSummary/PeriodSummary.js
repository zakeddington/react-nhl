import React from 'react';
import PropTypes from 'prop-types';
import CONSTANTS from '../../../config/Constants';
import Loader from '../../Shared/Loader/Loader';
import ErrorMessage from '../../Shared/ErrorMessage/ErrorMessage';
import Icon from '../../Shared/Icon/Icon';
import PlayerPhoto from '../../Shared/PlayerPhoto/PlayerPhoto';
import Modal from '../../Shared/Modal/Modal';
import ModalPlayerDetailContent from '../../Shared/Modal/ModalPlayerDetailContent';
import './PeriodSummary.scss';

function renderShootoutPlays(period) {
	return period.shootoutPlays.map((play, index) => {
		return (
			<div key={index} className="period-summary-item">
				<div className="period-summary-logo">
					<Icon iconId={play.teamId} iconType={CONSTANTS.iconType.logo}/>
				</div>
				<div className="period-summary-time"/>
				<div className="period-summary-photo">
					<Modal content={<ModalPlayerDetailContent contentId={play.shooter.id}/>} modalClass="player-detail">
						<PlayerPhoto playerId={play.shooter.id}/>
						<span className="offscreen">Open player details for {play.shooter.name} in modal window</span>
					</Modal>
				</div>
				<div className="period-summary-player-info">
						<span className="period-summary-player">
							<span className="period-summary-name">
								<Modal content={<ModalPlayerDetailContent contentId={play.shooter.id}/>} modalClass="player-detail">
									{play.shooter.name}
									<span className="offscreen">Open player details for {play.shooter.name} in modal window</span>
								</Modal>
								{play.shooter.desc ? ',' : ''}
							</span>
							<span className="period-summary-goal-desc">{play.shooter.desc}</span>
						</span>
				</div>
				<div className="period-summary-game-info">
						<span className={`period-summary-score team-${play.teamId} no-border`}>
							{
								play.isGoal ? <span className="team-background">{play.shotResult}</span> :
									<span>{play.shotResult}</span>
							}
						</span>
				</div>
			</div>
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
			return (
				<div key={goal.time} className="period-summary-item">
					<div className="period-summary-logo">
						<Icon iconId={goal.teamId} iconType={CONSTANTS.iconType.logo}/>
					</div>
					<div className="period-summary-time">{goal.time}</div>
					<div className="period-summary-photo">
						<Modal content={<ModalPlayerDetailContent contentId={goal.scorer.id}/>} modalClass="player-detail">
							<PlayerPhoto playerId={goal.scorer.id}/>
							<span className="offscreen">Open player details for {goal.scorer.name} in modal window</span>
						</Modal>
					</div>
					<div className="period-summary-player-info">
							<span className="period-summary-player">
								<span className="period-summary-name">
									<Modal content={<ModalPlayerDetailContent contentId={goal.scorer.id}/>} modalClass="player-detail">
										{goal.scorer.name}
										<span className="offscreen">Open player details for {goal.scorer.name} in modal window</span>
									</Modal> ({goal.scorer.total}),
								</span>
								<span className="period-summary-goal-desc">
								{goal.scorer.desc}
									{
										goal.isEmptyNet &&
										" (Empty Net)"
									}
								</span>
								{
									goal.goalType !== 'EVEN' &&
									<span className="period-summary-goal-type">
										{goal.goalType}
									</span>
								}
							</span>
						<span className="period-summary-details">
								{
									goal.assists.map((assist, i) => {
										return (
											<span key={assist.name}>
												<Modal content={<ModalPlayerDetailContent contentId={assist.id}/>} modalClass="player-detail">
													{assist.name}
													<span className="offscreen">Open player details for {assist.name} in modal window</span>
												</Modal> ({assist.total}){i < goal.assists.length - 1 && ', '}
											</span>
										)
									})
								}
							</span>
					</div>
					<div className="period-summary-game-info">
							<span className={`period-summary-score team-${goal.teamId} team-border`}>
								<span
									className={goal.score.away.isScoringTeam ? 'team-background' : ''}>{goal.score.away.name} {goal.score.away.goals}</span>
								<span
									className={goal.score.home.isScoringTeam ? 'team-background' : ''}>{goal.score.home.name} {goal.score.home.goals}</span>
							</span>
					</div>
				</div>
			)
		});

		if (!goals.length) {
			goals =
				<div className="period-summary-item">
					<div className="period-summary-empty">No Goals</div>
				</div>;
		}

		let penalties = period.penalties.map((penalty, i) => {
			return (
				<div key={`${penalty.time}-${i}`} className="period-summary-item">
					<div className="period-summary-logo">
						<Icon iconId={penalty.teamId} iconType={CONSTANTS.iconType.logo}/>
					</div>
					<div className="period-summary-time">{penalty.time}</div>
					<div className="period-summary-photo">
						<Modal content={<ModalPlayerDetailContent contentId={penalty.penaltyOn.id}/>} modalClass="player-detail">
							<PlayerPhoto playerId={penalty.penaltyOn.id}/>
							<span className="offscreen">Open player details for {penalty.penaltyOn.name} in modal window</span>
						</Modal>
					</div>
					<div className="period-summary-player-info">
							<span className="period-summary-player">
								<span className="period-summary-name">
									<Modal content={<ModalPlayerDetailContent contentId={penalty.penaltyOn.id}/>}
										modalClass="player-detail">
										{penalty.penaltyOn.name}
										<span className="offscreen">Open player details for {penalty.penaltyOn.name} in modal window</span>
									</Modal>
								</span>
							</span>
						<span className="period-summary-details">{penalty.penaltyMin} Minutes for {penalty.penaltyType}</span>
					</div>
					<div className="period-summary-game-info"/>
				</div>
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

	console.log('PeriodSummary', props);

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
	periodSummary: PropTypes.array,
}

export default PeriodSummary;
