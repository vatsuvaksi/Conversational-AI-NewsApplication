import React, { useEffect, useState } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';                            //This will import Alan button from the API (This will listen and take the response which is stored in my project)
import NewsCards from './Components/NewsCards/NewsCards';
import useStyles from './style';
import wordsToNumbers from 'words-to-numbers';                        // This is a package to convert numbers to word (useful to open articles)
const alanKey = 'somekeyhere/stage';                    //This is the personal key to the project for integration with this react Application
const App = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number }) => {
                if (command === 'newHeadlines') {
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                } else if (command === 'highlight') {
                    setActiveArticle((prevActiveArticle) =>
                        prevActiveArticle + 1);
                } else if (command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];
                    if (parsedNumber > 20) {
                        alanBtn().playText("Please try again");
                    } else if (article) {
                        window.open(article.url, "_blank");
                    }
                } else if (command === 'developer') {
                    window.open('https://www.linkedin.com/in/vatsuvaksi/', "_blank");
                }
            }
        })
    }, []);
    const classes = useStyles();              //Created a hook using material UI for styles 
    return (
        <>
            <div className={classes.logoContainer} >
                <img src="https://i.ibb.co/BrswdVZ/logo.jpg" className={classes.myLogo} alt ="logo"/>
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
        </>
    )
}
export default App;


/*
--------------------------------------------------alan button-------------------------------------------------------------------------------------------
  const [newsArticles, setNewsArticles] = useState([]);         // used useState to set new articles 
    const [activeArticle, setActiveArticle] = useState(-1);     // sets active article to the preent article being read used to scroll over active articles 
    useEffect(() => {
        alanBtn({                                            //This is the main feature 
            key: alanKey,                                    // primary key necessary to pass 
            onCommand: ({ command, articles, number }) => {         // onCommand function  
                if (command === 'newHeadlines') {
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                } else if (command === 'highlight') {
                    setActiveArticle((prevActiveArticle) =>
                        prevActiveArticle + 1);
                } else if (command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];
                    if (parsedNumber > 20) {
                        alanBtn().playText("Please try again");
                    } else if (article) {
                        window.open(article.url, "_blank");
                    }
                } else if (command === 'developer') {
                    window.open('https://www.linkedin.com/in/vatsuvaksi/', "_blank");
                }
            }
        })
    }, []);

*/
