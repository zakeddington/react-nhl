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
		const { modifiers } = this.props;

		if (this.tabs) {
			return (
				<StyledTabs modifiers={modifiers}>
					<TabsNav>
						{this.tabs.map((tab, i) => {
							const isActive = tab.props.id === activeTab.props.id;
							return (
								<TabsNavItem key={tab.props.tabTitle}>
									<TabsNavLink $isActive={isActive} onClick={(e) => this.onTabClick(e, i)}>
										{
											tab.props.iconId &&
											<Icon iconId={tab.props.iconId} iconType={tab.props.iconType} iconClass={tab.props.iconClass} />
										}
										{tab.props.tabTitle}
									</TabsNavLink>
								</TabsNavItem>
							);
						})}
					</TabsNav>
					<div>
						{this.tabs.map((child) => {
							const isActive = child.props.id === activeTab.props.id;
							return (
								<TabsContent key={child.props.id} $isActive={isActive}>{child}</TabsContent>
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
	modifiers: PropTypes.arrayOf(PropTypes.string),
}

export default Tabs;
