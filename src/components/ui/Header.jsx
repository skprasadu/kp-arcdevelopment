import React, { useState, useEffect } from 'react';
import { AppBar, 
    Toolbar, 
    Tabs, 
    Tab, 
    Button, 
    Menu, 
    MenuItem,
    SwipeableDrawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    useScrollTrigger, 
    useMediaQuery
 } from '@material-ui/core';

import  MenuIcon from "@material-ui/icons/Menu";
import { makeStyles, useTheme } from "@material-ui/styles";
import { Link } from 'react-router-dom';

import logo from "../../assets/logo.svg"

function ElevationScroll(props) {
    const { children } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

const useStyles = makeStyles(theme => ({
    toolbarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: "3em",
        [theme.breakpoints.down("md")]: {
            marginBottom: "2em"
        },
        [theme.breakpoints.down("xs")]: {
            marginBottom: "1.25em"
        }
    },
    logo: {
        height: "8em",
        [theme.breakpoints.down("md")]: {
            height: "7em"
        },
        [theme.breakpoints.down("xs")]: {
            height: "5.5em"
        }
    },
    logoContainer: {
        padding: 0,
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    tabContainer: {
        marginLeft: "auto"
    },
    tab: {
        ...theme.typography.tab,
        minWidth: 10,
        marginLeft: "25px"
    },
    button: {
        ...theme.typography.estimates,
        borderRadius: "50px",
        marginLeft: "50px",
        marginRight: "25px",
        height: "45px",
    },
    menu: {
        backgroundColor: theme.palette.common.blue,
        color: "white",
        borderRadius: "0px"
    },
    menuItem: {
        ...theme.typography.tab,
        opacity: 0.7,
        "&:hover": {
            opacity: 1
        }
    },
    drawerIcon: {
        height: "50px",
        width: "50px"
    },
    drawerIconContainer: {
        "marginLeft": "auto",
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    drawer: {
        backgroundColor: theme.palette.common.blue
    },
    drawerItem: {
        ...theme.typography.tab,
        color: "white",
        opacity: 0.7
    },
    drawerItemEstimates: {
        backgroundColor: theme.palette.common.orange
    },
    drawerItemSelected: {
        "& .MuiListItemText-root" : {
            opacity: 1
        }
    },
    appbar: {
        zIndex: theme.zIndex.modal + 1
    }
}));

export default function Header(props) {
    const classes = useStyles();
    const theme = useTheme();
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

    const matches = useMediaQuery(theme.breakpoints.down("md"));

    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);

    const { value, setValue, selectedIndex, setSelectedIndex } = props;

    const handleChange = (_, newValue) => {
        setValue(newValue);
    }

    const handleClick = (e, i) => {
        setAnchorEl(e.currentTarget);
        setOpenMenu(true);
        setSelectedIndex(i);
    }

    const handleClose = (e) => {
        setAnchorEl(null);
        setOpenMenu(false);
    }

    const map1 = {"/": 0, "/services": 1, "/revolution": 2, "/about": 3, "/contact": 4, "/estimates": 5,
                    '/customSoftware': 1, "/mobileApp": 1, "/websites": 1};

    const menuOptions = [{"link": "/services", "name": "Services" }, 
                    {"link": "/customSoftware", "name": "Custom Software Development"}, 
                    {"link": "/mobileApp", "name": "Mobile App Development"},
                    {"link": "/websites", "name": "Website Development"}];

    const routes = [{link: "/", name: "Home" }, 
                    {link: "/services", name: "Services", ariaOwns: anchorEl ? "true" : undefined, 
                        oriaHaspopup: anchorEl ? "true" : undefined, onMouseOver: event => handleClick(event)}, 
                    {link: "/revolution", name: "The Revolution"},
                    {link: "/about", name: "About Us"},
                    {link: "/contact", name: "Contact Us"},
                    {link: "/estimates", name: "Free Estimates", className: classes.drawerItemEstimates},
                ];

    useEffect(() => {
        setValue( map1[window.location.pathname]);
    }, [value, selectedIndex, menuOptions, routes])
        
    const tabs = (
        <React.Fragment>
        <Tabs value={value} onChange={handleChange} className={classes.tabContainer}
        indicatorColor="primary">
            {routes.map((x, i) => ( <Tab
                        key={`${x}${i}`} 
                        aria-owns={x.ariaOwns }
                        aria-haspopup={x.oriaHaspopup }
                        className={classes.tab} 
                        component={Link} 
                        to={x.link} 
                        label={x.name}
                        onMouseOver={x.onMouseOver} />)
                )}
    </Tabs>
    <Button variant="contained" color="secondary" className={classes.button} component={Link} to="/estimates" >
        Free Estimates
    </Button>
    <Menu id="simple-menu" anchorEl={anchorEl} open={openMenu}
        onClose={handleClose} 
        MenuListProps={{ onMouseLeave: handleClose }}
        classes={{paper: classes.menu}}
        elevation={0}
        style={{zIndex: 1302}}
        keepMounted
        >
         {menuOptions.map((x, i) => 
                <MenuItem key={x}
                    component={Link} 
                    to={x.link}
                    classes={{root: classes.menuItem}}
                    onClick={event => {
                        handleClick(event, i);
                        setValue(1);
                        handleClose();
                    }}
                    selected= {i === selectedIndex}>{x.name}</MenuItem>)}
    </Menu>
    </React.Fragment>);

    const drawer = (
        <React.Fragment>
            <SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS} 
                open={openDrawer}
                onClose = {() => setOpenDrawer(false)}
                onOpen = {() => setOpenDrawer(true)}
                classes={{paper: classes.drawer}}
                >
                    <div className={classes.toolbarMargin} />
                    <List disablePadding>
                        {routes.map((x, i) => (<ListItem 
                                    className={x.className} 
                                    onClick={() => {setOpenDrawer(false); setValue(i)}} 
                                    divider 
                                    component={Link} 
                                    to={x.link}
                                    selected={value === i}
                                    classes={{selected: classes.drawerItemSelected}}>
                                    <ListItemText 
                                        className={classes.drawerItem} 
                                        disableTypography>{x.name}</ListItemText>
                                </ListItem>))}
                    </List>
            </SwipeableDrawer>
            <IconButton onClick={() => setOpenDrawer(!openDrawer)} disableRipple
                classes={{root: classes.drawerIconContainer}}>
                <MenuIcon className={classes.drawerIcon}/>
            </IconButton>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <ElevationScroll>
                <AppBar position="fixed" className={classes.appbar}>
                    <Toolbar disableGutters>
                        <Button component={Link} to="/" 
                            className={classes.logoContainer} 
                            onClick={() => setValue(0)} 
                            disableRipple >
                            <img alt="company logo" src={logo} className={classes.logo} />
                        </Button>
                        {matches ? drawer : tabs}
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin} />
        </React.Fragment>
    );
}
