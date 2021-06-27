import React, { useState } from 'react';
import { Link, useRouteMatch, useHistory } from 'next/link';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StatsIcon from '@material-ui/icons/Assessment';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import MapIcon from '@material-ui/icons/Map';
import { withStyles } from '@material-ui/core';

import { useAuth } from '../Auth';
import styles from './layout.module.css';

const NewListItemText = withStyles({
  primary: {
    color: '#222',
  },
  root: {
    display: 'inline-block',
  },
})(ListItemText);

const CentredListItem = withStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: '2rem',
  },
})(ListItem);

function SidebarItem(props) {
  const match = useRouteMatch();

  return (
    <CentredListItem button>
      <Link
        to={`${match.path}/${props.pathName}`}
        style={{ textDecoration: 'none' }}
      >
        <div className={styles.centredLink}>
          <ListItemIcon>{props.icon}</ListItemIcon>
          <NewListItemText primary={props.name} />
        </div>
      </Link>
    </CentredListItem>
  );
}

function Layout(props) {
  const { login, logout, isAuthenticated } = useAuth();
  const history = useHistory();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  return (
    <div style={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Menu"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" style={{ flex: 1 }}>
            Toilet Map Explorer
          </Typography>
          {isAuthenticated() ? (
            <Button onClick={handleLogout} color="inherit">
              Logout
            </Button>
          ) : (
            <Button onClick={login} color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
        <div
          tabIndex={0}
          role="button"
          onClick={() => setDrawerOpen(false)}
          onKeyDown={() => setDrawerOpen(false)}
        >
          <div>
            <List>
              <SidebarItem name="Home" pathName="" icon={<HomeIcon />} />
              <SidebarItem
                name="Statistics"
                pathName="statistics"
                icon={<StatsIcon />}
              />
              <SidebarItem
                name="Statistics by Area"
                pathName="areas"
                icon={<StatsIcon />}
              />
              <SidebarItem
                name="Search"
                pathName="search"
                icon={<SearchIcon />}
              />
              <SidebarItem name="Area Map" pathName="map" icon={<MapIcon />} />
            </List>
          </div>
        </div>
      </Drawer>

      <div>{props.children}</div>
    </div>
  );
}

export default Layout;
