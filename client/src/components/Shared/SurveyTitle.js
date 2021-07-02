import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

export default function SurveyTitle(props) {
  return (
        <Grid item xs={12}>
          <Typography variant="h5">
            {props.title}
          </Typography>
        </Grid>
        );
}