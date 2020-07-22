import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components/macro';
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
	PlayerShotType,
	StatusColumn,
	ShootoutStatus,
	ShotResult,
} from './PeriodSummaryStyled';
import { Offscreen } from '../../../globalStyles/Utilities/Utilities';
import CreateTeamTheme from '../../../globalStyles/Themes/TeamBrands/CreateTeamTheme';

function PeriodSummaryShootoutPlay(props) {
	const {
		shooter,
		isGoal,
		shotResult,
		teamId,
	} = props;

	const teamTheme = CreateTeamTheme(teamId);

	return (
		<PeriodItem>
			<TeamLogoColumn>
				<Icon iconId={`${teamId}`} iconType={IconType.logo}/>
			</TeamLogoColumn>
			<TimeColumn />
			<PlayerPhotoColumn>
				<Modal content={<PlayerDetail playerId={shooter.id} />} modalClass="player-detail">
					<PlayerPhoto playerId={shooter.id}/>
					<Offscreen>Open player details for {shooter.name} in modal window</Offscreen>
				</Modal>
			</PlayerPhotoColumn>
			<PlayDetailsColumn>
				<DetailsRow>
					<PlayerName>
						<Modal content={<PlayerDetail playerId={shooter.id} />} modalClass="player-detail">
							{shooter.name}
							<Offscreen>Open player details for {shooter.name} in modal window</Offscreen>
						</Modal>
						{shooter.desc ? ',' : ''}
					</PlayerName>
					<PlayerShotType>{shooter.desc}</PlayerShotType>
				</DetailsRow>
			</PlayDetailsColumn>
			<StatusColumn>
				<ShootoutStatus>
					<ThemeProvider theme={teamTheme}>
						<ShotResult $isGoal={isGoal}>{shotResult}</ShotResult>
					</ThemeProvider>
				</ShootoutStatus>
			</StatusColumn>
		</PeriodItem>
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
