import React, { useEffect, useState} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';  //This will import Alan button from the API (This will listen and take the response which is stored in my project)
import NewsCards from './Components/NewsCards/NewsCards';
import useStyles from './style';
const alanKey = 'a6b85e7735320e3cec61034b9ac003592e956eca572e1d8b807a3e2338fdd0dc/stage'; //This is the personal key to the project for integration with this react Application
const App = () => {
    const [newsArticles,setNewsArticles] =useState([]);
    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command , articles }) => {
                if (command === 'newHeadlines') {
                    setNewsArticles(articles);
                }
            }
        })
    }, []);
    const classes=useStyles();
    return (
        <> 
           <div className={classes.logoContainer} >
<img src="https://i.ibb.co/BrswdVZ/logo.jpg" className={classes.myLogo} />
           </div>
            <NewsCards articles={newsArticles} />
        </>
    )
}
export default App;






// SOME SELF NOTES
// 1) onCommand () =>();      
/*This will work with either with switch or if and it will run as many commands as we want*/
// Working with ALAN AI

/* WORKING WITH ALAN */
/*
After creating the project on alan ai's website
the syntax is =>
1) Simple play
intent("Command1","command2","command3","...commandN",
reply("This is the reply that you want"));
2) Trigger play
intent('this is a command',(p)=>{
p.play("this will be played ");
});
3) Trigger a command
intent("start a commnd" , (p)=>{
    p.play({
        command: "testCommand"
    });
});
and in the js file inside onCommand we pass a param command inside the alan button 
 onCommand : ({command}) =>{
                if(command === 'testCommand'){
                    alert("this code was executed");
                }
            }
        })
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

intent('Give me the news from $(source* (.*))',(p)=>{
        let NEWS_API_URL =`https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;
    if(p.source.value){
        NEWS_API_URL =`${ NEWS_API_URL}&sources=${p.source.value.toLowerCase().split(" ").join("-")}`;
    }
    api.request(NEWS_API_URL,(error,response,body)=>{
        const {articles} = JSON.parse(body);
        if(!articles.length){
            p.play('Sorry, Please try from some other source');
            return;
        }
        savedArticles=articles; 
        p.play({
            command:'newHeadlines',
            articles
        });
        p.play(
            `Here are the (latest | related) news from ${p.source.value} `
        )
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
      //  p.then(confirmation);
    });
});
// Latest news from India 
intent('Give me the news from India',(p)=>{
        let NEWS_API_URL =`http://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`;
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
    });
});

*/
