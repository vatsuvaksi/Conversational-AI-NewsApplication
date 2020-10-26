import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import { Grid, Grow, Typography } from '@material-ui/core';
import useStyles from './style.js'
const NewsCards = ({ articles }) => {
    const classes = useStyles();
    return (
        <Grow in>
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>                          
                {articles.map((article, i) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} style={{display:'flex'}}>

                    <NewsCard article={article} i={i}/>
                    </Grid>
                ))}
            </Grid>
        </Grow>
    );
};

export default NewsCards;

/* 
Notes about material UI

<grid> makes a grid of those card in which articles headlines and some data is to be shown 
 <Grid item xs={12} sm={6} md={4} lg={3} style={{display:'flex'}}>  this is used for spacing  and obviously display is kept flex so it runs on all sizes
when imported as useStyles(Styling from style.js) in Newscards because makeStyles actually create a hook that we can all on the top our component 
const classes = useStyles();  we call this as a hook so that it gives access to all the objects of classes and container is made in makeStyles inside the styling.js  
*/