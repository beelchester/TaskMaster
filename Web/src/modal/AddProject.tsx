import { useMutation } from "@apollo/client";
import { Typography, Button, Box, TextField } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../features/pageSlice";
import { CREATE_PROJECT, UPDATE_PROJECT, DELETE_PROJECT } from "../graphql/ProjectMutations";
import { GET_USER } from "../graphql/Query";

interface props {
  isVisible: boolean;
  closeModal: () => void;
  mode?: string;
  toEditProject?: any;
}
const AddProject: React.FC<props> = ({
  isVisible,
  closeModal,
  mode,
  toEditProject,
}) => {

  const dispatch = useDispatch();
  const [animateDelete, setAnimateDelete] = useState(0);
  const [projectName, setProjectName] = useState("");
  const currentUser = useSelector((state: any) => state.user.user);

  const [createProject] = useMutation(CREATE_PROJECT);
  
  const handleCreateProject = (name: string) => {
    createProject({
      variables: {
        projectName: name,
        email: currentUser.email
      },
      refetchQueries: [
        { query: GET_USER, variables: { email: currentUser.email } },
      ],
    })
  };

  const [updateProject] = useMutation(UPDATE_PROJECT);
  const handleEditProject = (name: string, newName:string) => {
    updateProject({
      variables: {
        projectName: name,
        email: currentUser.email,
        newProjectName: newName
      },
      refetchQueries: [
        { query: GET_USER, variables: { email: currentUser.email } },
      ],
    })
  };

  const [deleteProject] = useMutation(DELETE_PROJECT);
  const handleDeleteProject = (name: string) => {
    deleteProject({
      variables: {
        projectName: name,
        email: currentUser.email
      },
      refetchQueries: [
        { query: GET_USER, variables: { email: currentUser.email } },
      ],
    })
  };

console.log(toEditProject?.projectName)
console.log(projectName)
  useEffect(() => {
    if (mode === "edit") {
      setProjectName(toEditProject?.projectName);
      console.log("ffff")
    }
  }, [mode, toEditProject?.projectName]);

  function editProject() {
    setAnimateDelete(animateDelete + 1);
    handleEditProject(toEditProject?.projectName,projectName);
    dispatch(changePage(projectName))
    closeModal();
    setProjectName("");
  }

  function submitProject() {
    setAnimateDelete(animateDelete + 1);
    handleCreateProject(projectName);
    closeModal();
    setProjectName("");
  }

  function deleteProjectHandler() {
    setAnimateDelete(animateDelete + 1);
    handleDeleteProject(toEditProject?.projectName);
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
            transition={{ duration: 0.2}}
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
              transition={{ duration: 0.2}}
            >
              { mode !== "delete" ? (<Box
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
                  initial={{ opacity: 0.3, scale: 1, x: "50", y: "0" }}
                  animate={{ opacity: 1, scale: 1, x: "0", y: "0" }}
                  transition={{
                    duration: 0.3,
                    delay: 0.0,
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
                  initial={{ opacity: 0.3, scale: 1, x: "50", y: "0" }}
                  animate={{ opacity: 1, scale: 1, x: "0", y: "0" }}
                  transition={{
                    duration: 0.3,
                    delay: 0.0,
                  }}
                >
                  <Typography
                    variant="h3"
                    component="h3"
                    sx={{ marginBottom: "1.5rem" }}
                  >
                  {mode === "edit" ? "Edit Project" :  "Add Project"}
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
                      onClick={() => {mode === "edit" ? editProject() : submitProject()}}
                        size="large"
                        sx={{
                          paddingX: "1.5rem",
                          marginX: "1.5rem",
                          bgcolor: "secondary.main",
                          color: "black",
                          ":hover": { bgcolor: "secondary.dark" },
                        }}
                      >
                        {mode === "edit" ? "Edit" : "Add"}
                      </Button>
                      <Button onClick={closeModal}  size="large">
                        Cancel
                      </Button>
                    </Box>
              </Box>
                </motion.div>
              </Box>):
              (
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
                  height: "20rem",
                }}
              >
               <motion.div
            className="box"
            key={animateDelete}
            initial={{ opacity: 0.3, scale: 1, x: "50", y: "0" }}
            animate={{ opacity: 1, scale: 1, x: "0", y: "0" }}
            transition={{
              duration: 0.3,
              delay: 0.0,
              // ease: [0, 0.71, 0.2, 1.01],
            }}
                >
                  <Typography
                    variant="h4"
                    component="h4"
                    sx={{ marginBottom: "0.5rem" }}
                  >
                    Are you sure you want to delete
                  </Typography>
                  <Typography
                    variant="h4"
                    component="h4"
                    display="inline"
                    sx={{ fontWeight: "bold", marginRight: "0.5rem" }}
                  >
                    {toEditProject?.projectName}
                  </Typography>
                  <Typography variant="h4" component="h4" display="inline">
                    project ?
                  </Typography>
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
                    marginTop: "3rem",
                  }}
                >
                  <Button
                    onClick={deleteProjectHandler}
                    size="large"
                    sx={{
                      marginRight: "1.5rem",
                      marginLeft: "0.1rem",
                      paddingX: "1.5rem",
                      bgcolor: "rgba(255, 41, 55, 0.8)",
                      color: "white",
                      ":hover": { bgcolor: "rgba(255, 41, 55, 0.76)" },
                    }}
                  >
                    Yes
                  </Button>
                  <Button  size="large">
                    Cancel
                  </Button>
                </motion.div>
              </Box>
              )
              }
            </motion.div>
          </>
        )}
  </AnimatePresence>
)
}

export default AddProject;