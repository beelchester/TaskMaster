import { IconButton, Box, Button, TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

interface props {
  isVisible: boolean;
  closeModal: () => void;
}

const Modal: React.FC<props> = ({ isVisible, closeModal }) => {
  
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState('P1');
  const [project, setProject] = useState('Project 1');
  const [dueDate, setDueDate] = useState(new Date());

  const priorities = ['P1', 'P2', 'P3'];
  const projects = ['Project 1', 'Project 2', 'Project 3'];
  return (
<AnimatePresence>
{isVisible && ( 
  <>
  <motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
>
    <div onClick={closeModal} style={{ backgroundColor: 'rgba(0,0,0,0.5)',
position: 'fixed',
top: 0,
left: 0,
zIndex: 100,
backdropFilter: 'blur(5px)',
width: '100%',
height: '100%',}}/>
</motion.div>
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1}}
exit={{ opacity: 0 }}
>

<Box
sx={{
bgcolor: 'background.paper',
position: 'fixed',
top: '50%',
left: '50%',
transform: 'translate(-50%, -50%)',
padding: '20px',
zIndex: 200,
border : '1px solid',
borderColor: 'rgba(255, 255, 255, 0.1)',
borderRadius: '10px',
width : '50rem',
height : '20rem',
}}
>
<TextField
        label="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        margin="normal"
        inputProps={{ style: { color: 'white', } }}
        InputLabelProps={{ style: { color: 'white',outlineColor:'white'} }}
        variant="outlined"
        sx={{width:'100%',"& .MuiOutlinedInput-notchedOutline":{borderColor: 'rgba(255,255,255,0.7)',},"& .MuiOutlinedInput-root:hover":{"& fieldset":{borderColor : 'white'}}} }
        
      />
      <FormControl >
        <InputLabel sx={{color:'white'}} id="priority-label">Priority</InputLabel>
        <Select
          labelId="priority-label"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          label="Priority"
          sx={{color:'white',"& fieldset":{borderColor : 'rgba(255,255,255,0.7)'}, "&:hover": {
            "& .MuiOutlinedInput-notchedOutline":{borderColor : 'white'}
          },".MuiSvgIcon-root ": {
                    fill: "white !important",
                  },}}
        >
          {priorities.map((p) => (
            <MenuItem sx={{color:'white',}} key={p} value={p}>
              {p}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl >
        <InputLabel sx={{color:'white'}} id="project-label">Project</InputLabel>
        <Select
          labelId="project-label"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          label="Project"
          sx={{color:'white',"& fieldset":{borderColor : 'rgba(255,255,255,0.7)'}, "&:hover": {
            "& .MuiOutlinedInput-notchedOutline":{borderColor : 'white'}
          },".MuiSvgIcon-root ": {
                    fill: "white !important",
                  },}}
        >
          {projects.map((p) => (
            <MenuItem sx={{color:'white'}} key={p} value={p}>
              {p}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <DatePicker  selected={dueDate} onChange={(date:Date) => setDueDate(date)} />
          
<Button onClick={closeModal}>Cancel</Button>
<Button  sx={{bgcolor:'secondary.main',color:'black',":hover":{bgcolor:"secondary.dark",}}}> Add Task </Button>
</Box>
</motion.div>

</>
)}
</AnimatePresence>)
}

export default Modal;
