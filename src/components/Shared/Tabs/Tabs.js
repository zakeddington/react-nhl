import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import {
	StyledTabs,
	TabsNav,
	TabsNavItem,
	TabsNavLink,
	TabsContent,
} from './TabsStyle';

class Tabs extends Component {
	state = {
		activeTab: React.Children.toArray(this.props.children)[0],
	};

	tabs = null;

	onTabClick(e, i) {
		this.setState({activeTab: this.tabs[i]});
	}

	render() {
		this.tabs = React.Children.toArray(this.props.children);
		const { activeTab } = this.state;
		const { modifier } = this.props;

		if (this.tabs) {
			return (
				<StyledTabs modifier={modifier}>
					<TabsNav>
						{this.tabs.map((tab, i) => {
							const classActive = tab.props.id === activeTab.props.id ? 'is-active' : '';
							return (
								<TabsNavItem key={tab.props.tabTitle}>
									<TabsNavLink className={classActive} onClick={(e) => this.onTabClick(e, i)}>
										{
											tab.props.iconId &&
											<Icon iconId={tab.props.iconId} iconType={tab.props.iconType} iconClass={tab.props.iconClass}/>
										}
										{tab.props.tabTitle}
									</TabsNavLink>
								</TabsNavItem>
							);
						})}
					</TabsNav>
					<div>
						{this.tabs.map((child) => {
							const classActive = child.props.id === activeTab.props.id ? 'is-active' : '';
							return (
								<TabsContent key={child.props.id} className={classActive}>{child}</TabsContent>
							);
						})}
					</div>
				</StyledTabs>
			);
		}

		return null;
	}
}

Tabs.propTypes = {
	children: PropTypes.node,
	modifier: PropTypes.string,
}

export default Tabs;
