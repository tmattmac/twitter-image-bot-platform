import { Button, Checkbox, FormControl, FormControlLabel, makeStyles, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import useAsyncService from '../hooks/useAsyncService';
import api from '../services/api';

// TODO: Move these to external config file
const FREQUENCY_OPTIONS = [1, 2, 3, 4, 6, 8, 12, 24];

const useStyles = makeStyles(theme => ({
  inlineInput: {
    margin: theme.spacing(0, 1),
    padding: 0
  },
  inlineInputGroup: {
    display: "flex",
    alignItems: "baseline"
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

  useEffect(() => {
    if (data) {
      setFormData({ ...data });
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSaved) {
      setIsSaved(true);
      api.updateSchedule(formData).catch(() => setIsSaved(false));
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
    <div>
      <Typography component="h2" variant="h5">Edit Schedule</Typography>
      <form onSubmit={handleSubmit}>
        <div className={classes.inlineInputGroup}>
        <Typography variant="body1">
            Post every
        </Typography>
          <FormControl variant="outlined" size="small">
            <Select
              name="frequency"
              aria-label="Frequency"
              value={formData.frequency}
              disabled={loading}
              onChange={handleChange}
              className={classes.inlineInput}
              
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
        <Button type="submit" variant="contained" disabled={isSaved} color="primary">Save</Button>
      </form>
    </div>
  )
}

export default EditScheduleForm;