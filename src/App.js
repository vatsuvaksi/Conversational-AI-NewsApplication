import React, { useEffect, useState } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';                            //This will import Alan button from the API (This will listen and take the response which is stored in my project)
import NewsCards from './Components/NewsCards/NewsCards';
import useStyles from './style';
import wordsToNumbers from 'words-to-numbers';                        // This is a package to convert numbers to word (useful to open articles)
const alanKey = 'a6b85e7735320e3cec61034b9ac003592e956eca572e1d8b807a3e2338fdd0dc/stage';                    //This is the personal key to the project for integration with this react Application
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


-----------------------------------------------------------------------ALAN AI ---------------------------------------------------------------------
// Use this sample to create your own voice commands
intent('Hello ', 'Hey', p=>  {
    p.play('(hello|hi there)');
});
intent('What does this app do ', 'Tell me the details of the application', p=>  {
    p.play('This application is a customized voice controlled AI that lets you automate things by asking the queries that are mentioned in the above cards, This application will follow your command and react accordingly');
});

// intent("start a command" , (p)=>{
//     p.play({
//         command: "testCommand"
//     });
// });


//This is added of the developer information
intent("Tell me about the developer", "What is the name of the developer" , "Name of the developer" , "who developed this app" ,"developer" , reply("Vatsal Gupta an undergrad student in Computer Science developed this application with the help of Alan AI and ReactJS"));

const API_KEY=''; // This is the api key to NEWS API
let savedArticles=[];  // Initialised this empty array (This is where the articles are going to be stored )
// Latest news by source
intent('Give me the news from $(source* (.*))',(p)=>{                                   //This is the syntax in ALAN AI
        let NEWS_API_URL =`https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;        //This is the API-URL from news api
    if(p.source.value){                                                                    // This loop checks if the value from source of P is not null
        NEWS_API_URL =`${ NEWS_API_URL}&sources=${p.source.value.toLowerCase().split(" ").join("-")}`;
        // Here NEWS_API_URL is appended with source = {value from the user } anfter that
        // First of all it is converted to lower case so that url like pattern can be made then
        // Secondly is is split by ' space ' into an array which is not stored
        //Thirdly it is rejoined using a - so tht the URL like pattern is created
    }
    api.request(NEWS_API_URL,(error,response,body)=>{                  //This is the way to send API request to the servers
        const {articles} = JSON.parse(body);                           //Here we are parsing the article [] from the url and taking it's body
        if(!articles.length){                                          // this if is used to check wether the article is valid or not
            p.play('Sorry, Please try from some other source');
            return;                                                     //By  returning it takes it out of this intent
        }
        savedArticles=articles;                                         // saved articles now receives the value from the article
        p.play({
            command:'newHeadlines',                                      //This will pass the command and pass the current saved article to the JS file
                                                                         //In the JS file through useEffect we have passed the command and article in the  alan button at the start only
            articles
        });
        p.play(
            `Here are the (latest | related) news from ${p.source.value} `      //This will play and the newscards.js file will be loaded on the sccreen
        )
            p.play('Would you like me to read the headlines?');
        p.then(confirmation);
    });
});
// News by terms
intent('What\'s up with $(term* (.*))',(p)=>{
        let NEWS_API_URL =`https://newsapi.org/v2/everything?apiKey=${API_KEY}`;
    if(p.term.value){
        NEWS_API_URL =`${ NEWS_API_URL}&q=${p.term.value}`;
    }
    api.request(NEWS_API_URL,(error,response,body)=>{
        const {articles} = JSON.parse(body);
        if(!articles.length){
            p.play('Sorry, Please try from some other term');
            return;
        }
        savedArticles=articles;
        p.play({
            command:'newHeadlines',
            articles
        });
        p.play(
            `Here are the (latest | related) articles on ${p.term.value} `
        )
            p.play('Would you like me to read the headlines?');
        p.then(confirmation);
    });
});

//News By category

// News by Categories
const CATEGORIES = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
const CATEGORIES_INTENT = `${CATEGORIES.map((category) => `${category}~${category}`).join('|')}|`;

intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT})`,
  `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines)`, (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=in`;

    if(p.C.value) {
        NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
    }

    api.request(NEWS_API_URL, (error, response, body) => {
        const { articles } = JSON.parse(body);

        if(!articles.length) {
            p.play('Sorry, please try searching for a different category.');
            return;
        }

        savedArticles = articles;

        p.play({ command: 'newHeadlines', articles });

        if(p.C.value) {
            p.play(`Here are the (latest|recent) articles on ${p.C.value}.`);
        } else {
            p.play(`Here are the (latest|recent) news`);
        }

        p.play('Would you like me to read the headlines?');
        p.then(confirmation);
    });
});
// Latest news from India
intent('Give me the news from India',(p)=>{
        let NEWS_API_URL =`http://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`;         //Here we do not need to append anything as it will display the news from India
    api.request(NEWS_API_URL,(error,response,body)=>{
        const {articles} = JSON.parse(body);
        if(!articles.length){
            p.play('Sorry, Please try from some other term');
            return;
        }
        savedArticles=articles;
        p.play({
            command:'newHeadlines',
            articles
        });
        p.play(
            `Here are the (latest | related) news from India `
        )
            p.play('Would you like me to read the headlines?');
        p.then(confirmation);
    });
});
const confirmation = context(() => {                                                //This is a function to read the headlines of the chosen topic
    intent('yes', async (p) => {
        for(let i = 0; i < savedArticles.length; i++){                            // this loops over the savedArticles
             p.play({ command: 'highlight', article: savedArticles[i]});          // this is used to pass the command along with the article to js for highlighting
            p.play(`${savedArticles[i].title}`);                                  // plays the savedArticle
        }
    })

    intent('no', (p) => {
        p.play('Sure, sounds good to me.')                                        // Incase the user says no to read articles
    })
})
});

intent("Open article (number|) $(number* (.*))" , (p)=>{                          /
    p.play("Sure, Give me a second to reload");
   p.play({command:'open' ,number:(p.number.value) ,  articles : savedArticles});         //passes the command open to js  
});
intent('(go|move|) back', (p) => {                                                        
    p.play('Sure, going back');
    p.play({ command: 'newHeadlines', articles: []})                             // passed an empty array so that when the user goes back the savedArticles becomes empty
})
*/
