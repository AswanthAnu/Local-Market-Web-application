import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  banner: {
    maxWidth: '100%',
    width: '100%',
  },
  textContainer: {
    textAlign: 'center',
    padding: theme.spacing(4),
  },
}));

const AboutPage = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <img src="/static/images/about_banners/about_banner_one.png" alt="Banner 1" className={classes.banner} />
        </Grid>
        <Grid item xs={12} sm={6} paddingBottom={2}>
        <img src="/static/images/about_banners/about_banner_two.png" alt="Banner 2" className={classes.banner} />
        </Grid>
        <Grid item xs={12} sm={6} paddingBottom={2}>
        <img src="/static/images/about_banners/about_banner_three.png" alt="Banner 3" className={classes.banner} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutPage;
