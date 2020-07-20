import React from 'react';
import PropTypes from 'prop-types';
import { IconType } from '../../../config/ImageIconConfig';
import Icon from '../../Shared/Icon/Icon';
import PlayerPhoto from '../../Shared/PlayerPhoto/PlayerPhoto';
import Modal from '../../Shared/Modal/Modal';
import PlayerDetail from '../../../containers/PlayerDetail';
import './PeriodSummary.scss';

function PeriodSummaryShootoutPlay(props) {
	const {
		shooter,
		isGoal,
		shotResult,
		teamId,
	} = props;

	return (
		<div className="period-summary-item">
			<div className="period-summary-logo">
				<Icon iconId={`${teamId}`} iconType={IconType.logo}/>
			</div>
			<div className="period-summary-time"/>
			<div className="period-summary-photo">
				<Modal content={<PlayerDetail playerId={shooter.id} />} modalClass="player-detail">
					<PlayerPhoto playerId={shooter.id}/>
					<span className="offscreen">Open player details for {shooter.name} in modal window</span>
				</Modal>
			</div>
			<div className="period-summary-player-info">
						<span className="period-summary-player">
							<span className="period-summary-name">
								<Modal content={<PlayerDetail playerId={shooter.id} />} modalClass="player-detail">
									{shooter.name}
									<span className="offscreen">Open player details for {shooter.name} in modal window</span>
								</Modal>
								{shooter.desc ? ',' : ''}
							</span>
							<span className="period-summary-goal-desc">{shooter.desc}</span>
						</span>
			</div>
			<div className="period-summary-game-info">
						<span className={`period-summary-score team-${teamId} no-border`}>
							{
								isGoal ? <span className="team-background">{shotResult}</span> :
									<span>{shotResult}</span>
							}
						</span>
			</div>
		</div>
	)
}

PeriodSummaryShootoutPlay.propTypes = {
	shooter:  PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		desc: PropTypes.string,
	}),
	isGoal: PropTypes.bool,
	shotResult: PropTypes.string,
	teamId: PropTypes.number,
}

export default PeriodSummaryShootoutPlay;
