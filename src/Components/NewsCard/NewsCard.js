import React from 'react'
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography } from '@material-ui/core'
import useStyles from './style.js'
import classNames from 'classnames';
const NewsCard = ({ article: { description, publishedAt, source, title, url, urlToImage }, activeArticle, i }) => {
  const classes = useStyles();
  return (
    <Card className={classNames(classes.card, activeArticle === i ? classes.activeCard : null)}>
      <CardActionArea href={url} target="_blank">
        <CardMedia className={classes.media} image={urlToImage || 'https://images.app.goo.gl/MtePU7KyKjQEPgPG9'} />
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{(new Date(publishedAt)).toDateString()}</Typography>
          <Typography variant="body2" color="textSecondary" component="h2">{source.name}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom varient="h5">{title}</Typography>
        <CardContent>
          <Typography varient="body2" color="textSecondary" component="p">{description}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary">Know More</Button>
        <Typography varient="h5" color="textSecondary">{i + 1}</Typography>
      </CardActions>
    </Card>
  )
}
export default NewsCard;




/*
destructured the article array in the beggining for ease 

const NewsCard = ({ article: { description, publishedAt, source, title, url, urlToImage }, activeArticle, i }) => {
  const classes = useStyles();     // used to immport style as an hook from material UI
  <Card className={classNames(classes.card, activeArticle === i ? classes.activeCard : null)}>
  //this checks if the index of the article being read equals the active article then we add styling 
}
*/