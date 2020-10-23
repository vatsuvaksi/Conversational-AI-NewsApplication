import React , {useEffect} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';  //This will import Alan button from the API (This will listen and take the response which is stored in my project)
const alanKey='a6b85e7735320e3cec61034b9ac003592e956eca572e1d8b807a3e2338fdd0dc/stage'; //This is the personal key to the project for integration with this react Application
const App = () =>{
    useEffect(() => {
        alanBtn({
            key : alanKey,
            onCommand : ({command}) =>{
                if(command === 'testCommand'){
                    alert("this code was executed");
                }
            }
        })
    }, [])
    return(
        <>
        <h1>Conversational AI based news Application</h1>
        </>
    )
}
export default App;



// SOME SELF NOTES
// 1) onCommand () =>();      
/*This will work with either with switch or if and it will run as many commands as we want*/
// Working with ALAN AI
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
and in the js file inside oncammand we pass a param command'
 onCommand : ({command}) =>{
                if(command === 'testCommand'){
                    alert("this code was executed");
                }
            }
        })
 4)Using external API in ALAN
 fetch the api key and store in a const value 
 then use 
 
intent('Give me the news from $(source* (.*))',(p)=>{
    let NEWS_API_URL =`https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;  //here JS is added for personalising the api key 
     if(p.source.value){
        NEWS_API_URL =`${ NEWS_API_URL}&sources=${p.source.value.toLowerCase().split(" ").join("-")}`;      //here we are appending the url with source from voice and then we are splitting it so that the spaces between the words become a sentence and and then joining it again with a - so that it becomes a string like the url
    
    }
});
*/
