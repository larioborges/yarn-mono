import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIconOutlined from '@mui/icons-material/HomeOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import SpeedIcon from '@mui/icons-material/Speed';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { Link } from 'gatsby-theme-material-ui';

const SideMenuListItem = ({ to, text, icon }) => (
    <ListItem button component={Link} to={to} selected={to === location.pathname}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}

        <ListItemText primary={text} />
    </ListItem>
);

SideMenuListItem.propTypes = {
    to: PropTypes.string,
    text: PropTypes.string,
    icon: PropTypes.element,
};

export const mainNavItems = (
    <div>
        <SideMenuListItem to="/dashboard" icon={<HomeIconOutlined />} text="Dashboard" />
        <SideMenuListItem icon={<PlayCircleOutlineIcon />} text="Games" />
        <SideMenuListItem icon={<PeopleOutlineIcon />} text="My Tribe" />
        <SideMenuListItem icon={<SpeedIcon />} text="Results" />
        <SideMenuListItem icon={<LeaderboardIcon />} text="Leaderboard" />
        <SideMenuListItem to="/charities" icon={<FavoriteBorderIcon />} text="Charities" />
        <SideMenuListItem icon={<LocalAtmIcon />} text="Wallet" />
        <SideMenuListItem to="/users/settings" icon={<SettingsIcon />} text="Settings" />
    </div>
);

export const secondaryNavItems = (
    <div>
        <SideMenuListItem icon={<LogoutIcon />} text="Log out" />
    </div>
);
