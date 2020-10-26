import { makeStyles } from "@material-ui/core/styles";
const styles = makeStyles({
container: {
    padding : '0 5%',
    width :  '100%',
    margain: 0
}
});
export default styles;


/* 
Here we are doing styling in js instead of css because of material UI
here the styles are passed as a string 
when imported as useStyles in Newscards because makeStyles actually create a hook that we can all on the top our component 

*/