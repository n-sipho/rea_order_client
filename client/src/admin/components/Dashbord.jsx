import React, { Component } from 'react'
import { Menu, Icon, Button, Modal } from 'semantic-ui-react'
import StockTable from './StockTable';
import ClientTable from './ClientTable';
import ActiveOrders from './ActiveOrders';
import UpdateStockForm from './UpdateStockForm';
import './Dashbord.css';

class Dashbord extends Component {
    constructor() {
        super();
        this.state = {
            activeItem: 'Stock',
            open: false,
            mobileMenuOpen: false
        };
    };

    handleItemClick = (e, { name }) => this.setState({
        activeItem: name,
        mobileMenuOpen: false
    });

    open = () => this.setState({ open: true });

    close = () => this.setState({ open: false });

    toggleMobileMenu = () => this.setState(({ mobileMenuOpen }) => ({
        mobileMenuOpen: !mobileMenuOpen
    }));

    renderHtmlContent = (active) => {
        let content;
        switch (active) {
            case 'Stock':
                content = <StockTable />;
                break;
            case 'Available stock':
                content = '';
                break;
            case 'Active orders':
                content = <ActiveOrders />;
                break;
            case 'Finished orders':
                content = '';
                break;
            case 'Users':
                content = <ClientTable />;
                break;
            case 'Connected users':
                content = '';
                break;
            case 'Verified users':
                content = '';
                break;
            case 'Profit':
                content = '';
                break;
            case 'Cash':
                content = '';
                break;
            case 'Bought':
                content = '';
                break;
            case 'Admin profile':
                content = '';
                break;
            case 'App settings':
                content = '';
                break;
            default:
                break;
        }
        return (
            <div>{content}</div>
        );
    }

    renderMenu = () => {
        const { activeItem } = this.state;
        return (
            <Menu id='admin-dashboard-menu' vertical className='admin-dashboard__menu'>
                <Menu.Item>
                    <Menu.Header>Products</Menu.Header>
                    <Menu.Menu>
                        <Menu.Item name='Stock' active={activeItem === 'Stock'} onClick={this.handleItemClick} />
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header>Orders</Menu.Header>
                    <Menu.Menu>
                        <Menu.Item name='Active orders' active={activeItem === 'Active orders'} onClick={this.handleItemClick}>
                        </Menu.Item>
                        <Menu.Item name='Finished orders' active={activeItem === 'Finished orders'} onClick={this.handleItemClick}>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header>Clients</Menu.Header>
                    <Menu.Menu>
                        <Menu.Item name='Users' active={activeItem === 'Users'} onClick={this.handleItemClick} />
                        <Menu.Item name='Connected users' active={activeItem === 'Connected users'} onClick={this.handleItemClick} />
                        <Menu.Item name='Verified users' active={activeItem === 'Verified users'} onClick={this.handleItemClick} />
                        <Menu.Item name='Not verified users' active={activeItem === 'Not verified users'} onClick={this.handleItemClick} />
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header>Market</Menu.Header>
                    <Menu.Menu>
                        <Menu.Item name='Profit' active={activeItem === 'Profit'} onClick={this.handleItemClick} />
                        <Menu.Item name='Cash' active={activeItem === 'Cash'} onClick={this.handleItemClick} />
                        <Menu.Item name='Bought' active={activeItem === 'Bought'} onClick={this.handleItemClick} />
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header>Settings</Menu.Header>
                    <Menu.Menu>
                        <Menu.Item name='Admin profile' active={activeItem === 'Admin profile'} onClick={this.handleItemClick}>
                            Admin profile
                        </Menu.Item>
                        <Menu.Item name='App settings' active={activeItem === 'App settings'} onClick={this.handleItemClick}>
                            App settings
                        </Menu.Item>
                    </Menu.Menu>
                </Menu.Item>
            </Menu>
        );
    }

    renderUpdateStockModal = () => {
        const { open } = this.state;
        return (
            <Modal open={open} size='small'>
                <Modal.Header>Add stock</Modal.Header>
                <Modal.Content scrolling><UpdateStockForm /></Modal.Content>
                <Modal.Actions><Button secondary floated='right' compact onClick={this.close} labelPosition='right' icon='x' content='Close' /></Modal.Actions>
            </Modal>
        );
    }

    render() {
        const { activeItem, mobileMenuOpen } = this.state;
        return (
            <div className='admin-dashboard'>
                {mobileMenuOpen && (
                    <button
                        type='button'
                        className='admin-dashboard__backdrop'
                        aria-label='Close dashboard menu'
                        onClick={this.toggleMobileMenu}
                    />
                )}
                <aside
                    className={`admin-dashboard__sidebar${mobileMenuOpen ? ' is-open' : ''}`}
                    aria-label='Admin dashboard navigation'
                >
                    <button
                        type='button'
                        className='admin-dashboard__menu-close'
                        onClick={this.toggleMobileMenu}
                    >
                        <Icon name='close' /> Close menu
                    </button>
                    {this.renderMenu()}
                </aside>
                <main className='admin-dashboard__main'>
                    <header className='admin-dashboard__header'>
                        <button
                            type='button'
                            className='admin-dashboard__menu-toggle'
                            aria-label={`${mobileMenuOpen ? 'Close' : 'Open'} dashboard menu`}
                            aria-controls='admin-dashboard-menu'
                            aria-expanded={mobileMenuOpen}
                            onClick={this.toggleMobileMenu}
                        >
                            <Icon name={mobileMenuOpen ? 'close' : 'bars'} />
                        </button>
                        <h1 className='admin-dashboard__title'>Dashboard <Icon name='dashboard' /></h1>
                        <Button secondary basic onClick={this.open}>Add stock</Button>
                    </header>
                    <h2 className='admin-dashboard__section-title'>{activeItem}</h2>
                    <div className='admin-dashboard__content'>
                        {this.renderHtmlContent(activeItem)}
                    </div>
                </main>
                {this.renderUpdateStockModal()}
            </div>
        )
    }
}

export { Dashbord };