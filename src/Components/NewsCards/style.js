import { makeStyles } from "@material-ui/core/styles";
const styles = makeStyles({
container: {
    padding : '0 5%',
    width :  '100%',
    margain: 0
},
card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '45vh',
    padding: '5%',
    borderRadius: 10,
    color: 'white',
  },
  infoCard: {
    display: 'flex', flexDirection: 'column', textAlign: 'center',
  }
});
export default styles;


/* 
Here we are doing styling in js instead of css because of material UI
here the styles are passed as a string 
when imported as useStyles in Newscards because makeStyles actually create a hook that we can all on the top our component 

*/