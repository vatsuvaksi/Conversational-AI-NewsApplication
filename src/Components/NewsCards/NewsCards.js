import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import { Grid, Grow, Typography } from '@material-ui/core';
import useStyles from './style.js'
const infoCards = [
    { color: '#1565c0', title: 'News by Categories', info: 'Business, Entertainment, General, Health, Science, Sports, Technology', text: 'Give me the latest Technology news' },
    { color: '#4527a0', title: 'News by Terms', info: 'Bitcoin, PlayStation 5, Smartphones, Donald Trump...', text: 'What\'s up with PlayStation 5' },
    { color: '#1565c0', title: 'News by Indian ', info: 'aaj tak, ndtv', text: 'Give me the latest Indian news from ndtv' },
    { color: '#283593', title: 'News by Sources', info: 'CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...', text: 'Give me the news from CNN' },
    { color: '#00838f', title: 'Latest News', text: 'Give me the latest news' },
];
const NewsCards = ({ articles, activeArticle }) => {
    const classes = useStyles();
    if (!articles.length) {
        return (
            <Grow in>
                <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                    {infoCards.map((infoCard) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} className={classes.infoCard}>
                            <div className={classes.card} style={{ backgroundColor: infoCard.color }}>
                                <Typography variant="h5" component="h5">{infoCard.title}</Typography>
                                {infoCard.info ? <Typography variant="h6" component="h6"><strong>{infoCard.title.split(' ')[2]}</strong>: <br />{infoCard.info}</Typography> : null}
                                <Typography variant="h6" component="h6"> Example <br />  Try saying: <br /> <i>{infoCard.text}</i></Typography>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </Grow>
        );
    }

    return (
        <Grow in>
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {articles.map((article, i) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} style={{ display: 'flex' }}>
                        <NewsCard activeArticle={activeArticle} i={i} article={article} />
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


/*
Notes on the above structure
info card is a pre defined array in which details that makes the app user friendly is stored, It stores all the commands that user can give to the ALAN AI

--through material Ui we define grid and grow
--then we loop over the array info card of objects
--Here we make cards that are to be displayed
then iniside this card declare various typography ine for
----------- Here it will check that if infocard has info then display that info (title)
 {infoCard.info ? <Typography variant="h6" component="h6"><strong>{infoCard.title.split(' ')[2]}</strong>: <br />{infoCard.info}</Typography> : null}
infocard.title.split(' ').[2]
Q) Why we did this ?
If you look in the info card array's object than the word we want to grab is the third
Example news by source then we grab source

 */