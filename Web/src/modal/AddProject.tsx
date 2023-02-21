import { useMutation } from "@apollo/client";
import { Typography, Button, Box, TextField } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { CREATE_PROJECT } from "../graphql/ProjectMutations";
import { GET_USER } from "../graphql/Query";

interface props {
  isVisible: boolean;
  closeModal: () => void;
  mode?: string;
  toEditTask?: any;
}
const AddProject: React.FC<props> = ({
  isVisible,
  closeModal,
}) => {
  const [animateDelete, setAnimateDelete] = useState(0);
  const [projectName, setProjectName] = useState("");

  const [createProject] = useMutation(CREATE_PROJECT);

  const handleCreateProject = (name: string) => {
    createProject({
      variables: {
        projectName: name,
        email: "sahil@sahil.com"
      },
      refetchQueries: [
        { query: GET_USER, variables: { email: "sahil@sahil.com" } },
      ],
    })
  };


  function submitProject() {
    setAnimateDelete(animateDelete + 1);
    handleCreateProject(projectName);
    closeModal();
    setProjectName("");
  }
return (
  <AnimatePresence>
     {isVisible && (
     <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              onClick={closeModal}
              style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 1000,
                backdropFilter: "blur(5px)",
                width: "100%",
                height: "100%",
              }}
            />
          </motion.div>
    <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Box
                sx={{
                  bgcolor: "background.paper",
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  paddingX: "60px",
                  paddingY: "4rem",
                  zIndex: 2000,
                  border: "1px solid",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "10px",
                  width: "50rem",
                  height: "22rem",
                }}
              >
                <motion.div
                  className="box"
                  key={animateDelete}
                  initial={{ opacity: 0, scale: 0.5, x: "200", y: "-5" }}
                  animate={{ opacity: 1, scale: 1, x: "0", y: "0" }}
                  transition={{
                    duration: 0.4,
                    delay: 0.0,
                    ease: [0, 0.71, 0.2, 1.01],
                  }}
                >
                  
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  
                  transition={{
                    duration: 0.3,
                    delay: 0.0,
                  }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                 <motion.div
                  className="box"
                  // key={Title}
                  initial={{ opacity: 0, scale: 0.5, x: "200", y: "10" }}
                  animate={{ opacity: 1, scale: 1, x: "0", y: "0" }}
                  transition={{
                    duration: 0.4,
                    delay: 0.0,
                    ease: [0, 0.71, 0.2, 1.01],
                  }}
                >
                  <Typography
                    variant="h3"
                    component="h3"
                    sx={{ marginBottom: "1.5rem" }}
                  >
                  Add Project
                  </Typography>
                </motion.div> 
                 
                <TextField
                    label="Project Name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    margin="normal"
                    inputProps={{ style: { color: "white" } }}
                    InputLabelProps={{
                      style: { color: "white", outlineColor: "white" },
                    }}
                    variant="outlined"
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.7)",
                      },
                      "& .MuiOutlinedInput-root:hover": {
                        "& fieldset": { borderColor: "white" },
                      },
                    }}
                  />
                  
                <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "1.5rem",
                      }}
                    >
                      <div></div>
                <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Button
                      onClick={submitProject}
                        size="large"
                        sx={{
                          paddingX: "1.5rem",
                          marginX: "1.5rem",
                          bgcolor: "secondary.main",
                          color: "black",
                          ":hover": { bgcolor: "secondary.dark" },
                        }}
                      >
                        Add
                      </Button>
                      <Button  size="large">
                        Cancel
                      </Button>
                    </Box>
              </Box>
                </motion.div>
              </Box>
            </motion.div>
          </>
        )}
  </AnimatePresence>
)
}

export default AddProject;