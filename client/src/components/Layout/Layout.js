import React, { Component }from 'react'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import './Layout.css'


class Layout extends Component {
	state = {
		showSideDrawer: false
	}

	sideDrawerClosedHandler = () => {
		this.setState({showSideDrawer: false})
	}

	openSideDrawerHandler = () => {
		this.setState((prevState) => {
			return {showSideDrawer: !prevState.showSideDrawer}
		})
	}

	render() {
		return (
			<>
				<Toolbar openSideDrawer={this.openSideDrawerHandler} isSideDrawerOpen={this.state.showSideDrawer} />
				<SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
				
				<section className="Content" >
					{ this.props.children }
				</section>
			</>
		)
	}
};

export default Layout