import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import FooterAdornment from '../../assets/Footer Adornment.svg';
import facebook from '../../assets/facebook.svg';
import twitter from '../../assets/twitter.svg';
import instagram from '../../assets/instagram.svg';

const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: theme.palette.common.blue,
        width: "100%",
        zIndex: 1302,
        position: "relative"
    },
    adornment: {
        width: "25em",
        verticalAlign: "bottom",
        [theme.breakpoints.down("md")]: {
            width: "21em"
        },
        [theme.breakpoints.down("xs")]: {
            width: "15em"
        }

    },
    mainContainer: {
        position: "absolute"
    },
    link: {
        color: "white",
        fontFamily: "Arial",
        fontSize: "0.75rem",
        fontWeight: "bold"
    },
    gridItem: {
        margin: "3em"
    },
    icon: {
        height: "4em",
        width: "4em",
        [theme.breakpoints.down("xs")]: {
            height: "2.5em",
            width: "2.5em"
        }
    },
    socialContainer: {
        position: "absolute",
        marginTop: "-6em",
        right: "1.5em",
        [theme.breakpoints.down("xs")]: {
            right: "0.6em",
        }
    }
}));

export default function Footer(props) {
    const classes = useStyles();
    const { value, setValue, selectedIndex, setSelectedIndex } = props;

    return (
        <footer className={classes.footer}>
            <Hidden mdDown>
                <Grid container justify="center" className={classes.mainContainer} >
                    <Grid item className={classes.gridItem}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item component={Link} to="/" onClick={() => setValue(0)} className={classes.link}>Home</Grid>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.gridItem}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item component={Link} to="/services" onClick={() => {
                                setValue(1);
                                setSelectedIndex(0)
                            }} className={classes.link}>Services</Grid>
                            <Grid item component={Link} to="/customSoftware" onClick={() => {
                                setValue(1);
                                setSelectedIndex(1)
                            }} className={classes.link}>Custom Software</Grid>
                            <Grid item component={Link} to="/mobileApp" onClick={() => {
                                setValue(1);
                                setSelectedIndex(2)
                            }} className={classes.link}>Mobile Development</Grid>
                            <Grid item component={Link} to="/websites" onClick={() => {
                                setValue(1);
                                setSelectedIndex(3)
                            }} className={classes.link}>Website Development</Grid>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.gridItem}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item component={Link} to="/revolution" onClick={() => setValue(2)} className={classes.link}>The Revolution</Grid>
                            <Grid item className={classes.link}>Vision</Grid>
                            <Grid item className={classes.link}>Technology</Grid>
                            <Grid item className={classes.link}>Process</Grid>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.gridItem}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item component={Link} to="/about" onClick={() => setValue(3)} className={classes.link}>About Us</Grid>
                            <Grid item className={classes.link}>History</Grid>
                            <Grid item className={classes.link}>Team</Grid>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.gridItem}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item component={Link} to="/contact" onClick={() => setValue(4)} className={classes.link}>Contact Us</Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Hidden>
            <img alt="black decorative slash" src={FooterAdornment} className={classes.adornment} />
            <Grid container justify="flex-end" spacing={2} className={classes.socialContainer}>
                <Grid item component={"a"} href="http://www.facebook.com" rel="noopener noreferrer">
                    <img alt="facebook logo" src={facebook} className={classes.icon}/>
                </Grid>
                <Grid item component={"a"} href="http://www.twitter.com" rel="noopener noreferrer">
                    <img alt="twitter logo" src={twitter} className={classes.icon}/>
                </Grid>
                <Grid item component={"a"} href="http://www.instagram.com" rel="noopener noreferrer">
                    <img alt="instagram logo" src={instagram} className={classes.icon}/>
                </Grid>
            </Grid>
        </footer>
    );
}
