import React from 'react';
import PropTypes from 'prop-types';
import { IconType } from '../../../config/ImageIconConfig';
import Icon from '../../Shared/Icon/Icon';
import PlayerPhoto from '../../Shared/PlayerPhoto/PlayerPhoto';
import Modal from '../../Shared/Modal/Modal';
import PlayerDetail from '../../../containers/PlayerDetail';
import {
	PeriodItem,
	TeamLogoColumn,
	TimeColumn,
	PlayerPhotoColumn,
	PlayDetailsColumn,
	DetailsRow,
	PlayerName,
	SecondaryDetails,
	StatusColumn,
} from './PeriodSummaryStyle';
import { Offscreen } from '../../../globalStyles/Utilities/Utilities';

function PeriodSummaryPenalty(props) {
	const {
		time,
		teamId,
		penaltyOn,
		penaltyType,
		penaltyMin,
	} = props;

	return (
		<PeriodItem>
			<TeamLogoColumn>
				<Icon iconId={`${teamId}`} iconType={IconType.logo}/>
			</TeamLogoColumn>
			<TimeColumn>{time}</TimeColumn>
			<PlayerPhotoColumn>
				<Modal content={<PlayerDetail playerId={penaltyOn.id} />} modalClass="player-detail">
					<PlayerPhoto playerId={penaltyOn.id}/>
					<Offscreen>Open player details for {penaltyOn.name} in modal window</Offscreen>
				</Modal>
			</PlayerPhotoColumn>
			<PlayDetailsColumn>
				<DetailsRow>
					<PlayerName>
						<Modal content={<PlayerDetail playerId={penaltyOn.id} />}
							modalClass="player-detail">
							{penaltyOn.name}
							<Offscreen>Open player details for {penaltyOn.name} in modal window</Offscreen>
						</Modal>
					</PlayerName>
				</DetailsRow>
				<DetailsRow>
					<SecondaryDetails>{penaltyMin} Minutes for {penaltyType}</SecondaryDetails>
				</DetailsRow>
			</PlayDetailsColumn>
			<StatusColumn />
		</PeriodItem>
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
