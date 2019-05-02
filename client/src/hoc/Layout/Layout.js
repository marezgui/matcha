import React, { Component }from 'react'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
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
		console.log('exe')
	}

	render() {
		return (
			<>
				<Toolbar openSideDrawer={this.openSideDrawerHandler}/>
				<SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
				
				<section className="Content" >
					{ this.props.children }
				</section>
			</>
		)
	}
};

export default Layout