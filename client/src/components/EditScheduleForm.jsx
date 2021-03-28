import { Button, Checkbox, FormControl, FormControlLabel, makeStyles, MenuItem, Paper, Select, TextField, Typography } from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import SnackbarContext from '../context/snackbar/context';
import useAsyncService from '../hooks/useAsyncService';
import api from '../services/api';

// TODO: Move these to external config file
const FREQUENCY_OPTIONS = [1, 2, 3, 4, 6, 8, 12, 24];

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  inlineInput: {
    margin: theme.spacing(0, 1),
    padding: 0
  },
  inlineInputGroup: {
    display: "flex",
    flexFlow: 'row wrap',
    alignItems: "baseline"
  },
  selectInput: {
    overflow: 'visible'
  },
  header: {
    marginBottom: theme.spacing(1)
  },
  submitButton: {
    marginTop: theme.spacing(1)
  }
}));

const EditScheduleForm = () => {
  const [data, loading, error] = useAsyncService(api, 'getSchedule');
  const [isSaved, setIsSaved] = useState(true);
  const [formData, setFormData] = useState({
    startTime: '',
    frequency: '',
    enabled: false
  });
  const classes = useStyles();
  const notify = useContext(SnackbarContext);

  useEffect(() => {
    if (data) {
      setFormData({ ...data });
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSaved) {
      setIsSaved(true);
      api.updateSchedule(formData)
        .then(() => notify('Schedule updated successfully', 'success'))
        .catch(() => {
          setIsSaved(false);
          notify('There was an error updating your schedule.')
        });
    }
  }

  const handleChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: (
        e.target.type === 'checkbox' ? e.target.checked : e.target.value
      )
    }));
    setIsSaved(false);
  }

  return (
    <Paper elevation={2} className={classes.root}>
      <Typography component="h2" variant="h6" className={classes.header}>Edit Schedule</Typography>
      <form onSubmit={handleSubmit}>
        <div className={classes.inlineInputGroup}>
        <Typography variant="body1">
            Post every
        </Typography>
          <FormControl variant="outlined" size="small" className={classes.selectInput}>
            <Select
              name="frequency"
              aria-label="Frequency"
              value={formData.frequency}
              disabled={loading}
              onChange={handleChange}
              className={classes.inlineInput}
              classes={{
                selectMenu: classes.selectInput
              }}
            >
              {FREQUENCY_OPTIONS.map(value => <MenuItem key={value} value={value}>{value}</MenuItem>)}
            </Select>
          </FormControl>
          <Typography variant="body1">
          hours starting at
        </Typography>
          <TextField 
            name="startTime"
            aria-label="Start Time"
            onChange={handleChange} 
            type="time" 
            value={formData.startTime} 
            disabled={loading} 
            variant="outlined"
            size="small"
            className={classes.inlineInput}
            required
          />
        </div>
        <FormControlLabel
          label="Enabled"
          control={
            <Checkbox
              name="enabled"
              checked={formData.enabled}
              onChange={handleChange}
              color="primary"
            />
          }
        />
        <br />
        <Button type="submit" variant="contained" disabled={isSaved} color="primary" className={classes.submitButton}>Save</Button>
      </form>
    </Paper>
  )
}

export default EditScheduleForm;