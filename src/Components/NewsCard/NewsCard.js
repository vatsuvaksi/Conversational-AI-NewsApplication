import React from 'react'
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography } from '@material-ui/core'
import useStyles from './style.js'
const NewsCard = ({ article: { description, publishedAt, source, title, url, urlToImage }, activeArticle, i }) => {
  const classes=useStyles();
  
  return (
    <Card className={classes.card}>
      <CardActionArea href = {url} target="_blank">
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



<Card>       // card from material Ui
          <CardActionArea> The clickable unit of the card
         <CardMedia image={urlToImage || 'https://images.app.goo.gl/MtePU7KyKjQEPgPG9'} />
           // contains all the media
           // here it shows the image from the article or a temp image if the image isn't presnt 
          <div>                                                                     //ANYTHING INSIDE MATERIAL UI THAT IS A TEXT IS IN THE TYPOGRAPHY COLUMN it helps us to give it's component styling etc etc
          <Typography variant="body2" color="textSecondary" component="h2"></Typography>

          <Typography variant="body2" color="textSecondary" component="h2"></Typography>
            </div>
          <Typography gutterBottom varient="h5"></Typography>
          <CardContent>
            <Typography></Typography>
          </CardContent>
           </CardActionArea>
 <CardActions>              // here will be all the buttons and things

      </CardActions>

        </Card>


*/