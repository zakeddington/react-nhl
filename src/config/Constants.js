/**
 * Constants
 * @description  Defines application constants
 */

const Constants = {
	routePaths: {
		schedule: '/schedule/',
		game: '/game/',
	},

  iconType: {
	  icon: 'icon',
    logo: 'logo',
  },

  imgUrl: {
    icon: {
      base: '/assets/images/icons.svg#icon-',
    },
    logoTeams: {
      base: '/assets/images/logo-teams.svg#team-',
    },
    player: {
      base: '//nhl.bamcontent.com/images/',
      ext: '@2x.jpg',
      headshot: 'headshots/current/168x168/',
      hero: 'actionshots/',
      arena: 'arena/default/',
    }
  },

	lang: 'en-US',

	momentOptions: {
		apiFormat:  'YYYY-MM-DD',
		displayFormat: 'ddd, MMM D',
	},

	dateOptions: {
		weekday : 'long',
		year    : 'numeric',
		month   : 'long',
		day     : 'numeric',
	},

	timeOptions: {
		timeZone     : 'America/New_York',
		hour         : '2-digit',
		minute       : '2-digit',
		timeZoneName : 'short',
	},

	isMobileView: null,
	isTabletView: null,
	isDesktopView: null,

	currentBreakpoint: null,

	breakpoints: {
		1: 'mobile',
		2: 'tablet',
		3: 'desktop'
	}
};

export default Constants;
