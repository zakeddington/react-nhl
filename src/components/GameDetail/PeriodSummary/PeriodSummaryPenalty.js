import React from 'react';
import PropTypes from 'prop-types';
import CONSTANTS from '../../../config/Constants';
import Icon from '../../Shared/Icon/Icon';
import PlayerPhoto from '../../Shared/PlayerPhoto/PlayerPhoto';
import Modal from '../../Shared/Modal/Modal';
import PlayerDetail from '../../../containers/PlayerDetail';
import './PeriodSummary.scss';

function PeriodSummaryPenalty(props) {
	const {
		time,
		teamId,
		penaltyOn,
		penaltyType,
		penaltyMin,
	} = props;

	return (
		<div className="period-summary-item">
			<div className="period-summary-logo">
				<Icon iconId={`${teamId}`} iconType={CONSTANTS.iconType.logo}/>
			</div>
			<div className="period-summary-time">{time}</div>
			<div className="period-summary-photo">
				<Modal content={<PlayerDetail playerId={penaltyOn.id} />} modalClass="player-detail">
					<PlayerPhoto playerId={penaltyOn.id}/>
					<span className="offscreen">Open player details for {penaltyOn.name} in modal window</span>
				</Modal>
			</div>
			<div className="period-summary-player-info">
				<span className="period-summary-player">
					<span className="period-summary-name">
						<Modal content={<PlayerDetail playerId={penaltyOn.id} />}
							modalClass="player-detail">
							{penaltyOn.name}
							<span className="offscreen">Open player details for {penaltyOn.name} in modal window</span>
						</Modal>
					</span>
				</span>
				<span className="period-summary-details">{penaltyMin} Minutes for {penaltyType}</span>
			</div>
			<div className="period-summary-game-info"/>
		</div>
	)
}

PeriodSummaryPenalty.propTypes = {
	time: PropTypes.string,
	teamId: PropTypes.number,
	penaltyOn:  PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
	}),
	penaltyType: PropTypes.string,
	penaltyMin: PropTypes.number,
}

export default PeriodSummaryPenalty;
