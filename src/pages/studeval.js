import React, { useState } from "react";

import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Link,
  Avatar,
  IconButton,
  Button,
  Drawer,
  List,
  Divider,
  ListItem,
  MenuItem,
  FormControl,
  Select,
  Modal,
  TextField,
} from "@mui/material";
//import { Link } from "react-router-dom";


import ReactDOM from 'react-dom'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { useSelector, useDispatch } from "react-redux";
import { toggleTheme, getTheme } from "../redux/actions/uiAction";

import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness2Icon from "@mui/icons-material/Brightness2";
import MenuIcon from "@mui/icons-material/Menu";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";

import top1 from "../assets/img/top1.jpg";
//import theme from "../utils/theme.js";

import { useEffect } from "react";

import {setComment} from "../redux/actions/commentAction";

const style = {
  //helper
  marginTop3: {
    marginTop: 3,
  },

  root: {
    transition: "0.5s",
    backgroundColor: (theme) => theme.palette.background.default,
    height: "100%",
  },

  appbar: {
    backgroundColor: (theme) => theme.palette.background.main,
  },

  menuLink: {
    marginLeft: 2,

    "&:hover": {
      color: (theme) => theme.palette.secondary.main,
      transform: "scale(1.05)",
      transition: ".3s",
    },
    fontSize: {
      xs: "0.9rem",
      sm: "0.9rem",
      md: "1.1rem",
    },

    display: {
      xs: "none",
      sm: "none",
      md: "block",
    },
  },

  menuLink2: {
    fontSize: {
      xs: "0.9rem",
      sm: "0.9rem",
      md: "1.1rem",
    },
  },

  section1: {
    alignContent: "center",
    padding: {
      xs: "10px 40px",
      sm: "10px 90px",
      md: "15px 150px",
    },
    backgroundColor: (theme) => theme.palette.background.main,
    display: "flex",
    flexDirection: "column",
  },

  headingStyle1: {
    animation: "zoomIn",
    animationDuration: "1s",
    animationDelay: "0.4s",
    animationFillMode: "both",
    textAlign: "center",
    fontWeight: 700,
    fontSize: {
      xs: "2.5rem",
      sm: "3.5rem",
      md: "4.8rem",
    },
  },
  subtitle1: {
    animation: "zoomIn",
    animationDuration: "1s",
    animationDelay: "0.6s",
    animationFillMode: "both",
    textAlign: "center",
    fontSize: {
      xs: "1rem",
      sm: "1.25rem",
      md: "1.5rem",
    },
  },

  section2: {
    marginTop: "20px",
    padding: {
      xs: "10px 40px",
      sm: "10px 90px",
      md: "15px 150px",
    },
    backgroundColor: (theme) => theme.palette.background.main,
  },

  colContainer: {
    display: "flex",
    flexDirection: { xs: "column", sm: "column", md: "row" },
    margin: "5px",
  },

  menu: {
    display: {
      xs: "block",
      sm: "block",
      md: "none",
    },
  },

  cardContent: {
    display: "flex",
    width: "auto",
    height: "100%",
    justifyContent: "center",
    flexDirection: {
      xs: "column",
      sm: "column",
      md: "column",
      lg: "row",
    },
  },

  card: {
    height: {
      xs: "100%",
      sm: "100%",
      md: "100%",
    },
    width: "100%",
    justifyContent: "center",

    backgroundColor: (theme) => theme.palette.background.main,
  },

  cardPrimaryText: {
    fontSize: 14,
    color: "text.primary",
  },
  cardSecondaryText: {
    fontSize: 14,
    color: "text.secondary",
  },

  cardContainer: {
    display: "flex",
    flexDirection: "column",
  },

  avatarBox: {
    minWidth: "205px",
    height: "100%",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    flexDirection: "column",
  },

  sort: {
    width: "100%",
    justifyContent: "flex-end",
    display: "flex",
    flexWrap: "wrap",
  },

  studentlist: {
    width: "100%",
    display: "flex",
  },

  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    color: "text.primary",
    border: "2px solid white",
    boxShadow: 0,
    p: 4,
    textAlign: "center",
  },

  ratingbutton: {
    height: "30px",
  },
};
//////////////////////////////////////////table api
/* const columns = [
  { id: "avatar", label: "", minWidth: 170 },
  { id: "name", label: "", minWidth: 170 },

  {
    id: "yearsection",
    label: "Year & Section",
    minWidth: 170,
  },
  {
    id: "reviews",
    label: "Reviews",
    minWidth: 170,
  },
  {
    id: "rating",
    label: "Rating",
    minWidth: 170,
  },
]; */

//////////////////////////////////////////table api

export default function StudEval() {
  //const { comments }= useSelector((state) => state);
  const [comm, setComm] = useState({
    comment: "",

  });


  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);
  useEffect(() => {
    dispatch(getTheme());
  }, [dispatch]);

  const _toggleTheme = () => {
    dispatch(toggleTheme(!ui.isDarkMode));
  };

  //////////////////////////////////////////modal

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //////////////////////////////////////////modal end

  /////////////////////////////////////////////drawer
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        overflow: "hidden",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
          <Link color="textPrimary" href="/index">
            Student List
          </Link>
        </ListItem>
        <ListItem>
          <Link color="textPrimary" href="/studeval">
            Student Evaluation
          </Link>
        </ListItem>
        <ListItem
          color="default"
          sx={{ marginLeft: 2, transition: "0.9s" }}
          onClick={_toggleTheme}
          component="span"
        >
          {ui.isDarkMode ? <Brightness7Icon /> : <Brightness2Icon />}
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  /////////////////////////////////////////////////////drawer end

  ////////////////////////////////table start
  // eslint-disable-next-line
  const [page, setPage] = React.useState(0);
  // eslint-disable-next-line
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // eslint-disable-next-line
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  // eslint-disable-next-line
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  /////////////////////////////table end

///////comment
const submit = (e) => {
  e.preventDefault();

  dispatch(setComment(comm.comment));

  document.getElementById("customcomment");
  
  
  ReactDOM.render(
    <Card sx={style.card}>
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Avatar sx={{ mx: "10px" }} src={top1} />
          <Box>
            <Typography sx={{ fontSize: "20px" }}>
              Nicolas, Klinth Vincent O.
            </Typography>
            <Typography
              sx={{ fontSize: "10px", color: "text.secondary" }}
            >
              Posted 69 years ago
            </Typography>
          </Box>
        </Box>
        <Box sx={{ margin: "10px" }}>
          <Typography sx={style.cardPrimaryText}>
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarOutlineIcon />
            <StarOutlineIcon />
          </Typography>
        </Box>
        <Box>{comm.comment}</Box>
      </CardContent>
    </Card>
  , document.getElementById('customcomment'));
};



const handleChange = (prop) => (e) => {
  setComm((prevItem) => ({ ...prevItem, [prop]: e.target.value }));
};

/////comment end


  return (
    <Box sx={style.root}>
      <AppBar position="static" sx={style.appbar}>
        <Toolbar sx={{ paddingLeft: 2 }}>
          <Typography color="textPrimary" sx={style.menuLink2}>
            Student Review
          </Typography>
          <Box component="span" sx={{ flexGrow: 1 }} />

          <Link href="/index" underline="none">
            <Typography color="textPrimary" sx={style.menuLink}>
              {" "}
              Student List{" "}
            </Typography>
          </Link>

          <Link href="/studeval" sx={{ underline: "5px solid black" }}>
            <Typography color="textPrimary" sx={style.menuLink}>
              Student Evaluation{" "}
            </Typography>
          </Link>

          <Link href="/studeval" underline="none">
            <Typography color="textPrimary" sx={style.menuLink}>
              Blog{" "}
            </Typography>
          </Link>

          <IconButton
            color="default"
            sx={{
              marginLeft: 2,
              transition: "0.9s",
              display: {
                xs: "none",
                sm: "none",
                md: "block",
              },
            }}
            onClick={_toggleTheme}
            component="span"
          >
            {ui.isDarkMode ? <Brightness7Icon /> : <Brightness2Icon />}
          </IconButton>

          {["right"].map((anchor) => (
            <React.Fragment key={anchor}>
              <IconButton
                color="default"
                sx={style.menu}
                onClick={toggleDrawer(anchor, true)}
              >
                {" "}
                <MenuIcon />{" "}
              </IconButton>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
        </Toolbar>
      </AppBar>

      <Box sx={style.section1}>
        <Box>
          <Grid container sx={style.cardContainer}>
            <Grid sx={style.colContainer}>
              <Card sx={style.card}>
                <CardContent sx={style.cardContent}>
                  <Box sx={style.avatarBox}>
                    <Avatar
                      sx={{
                        height: "auto",
                        minWidth: "100px",
                        margin: "10px",
                      }}
                      src={top1}
                    />

                    <Typography sx={style.cardPrimaryText}>
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarOutlineIcon />
                      <StarOutlineIcon />
                    </Typography>

                    <Typography sx={style.cardSecondaryText}>
                      30 Reviews
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      margin: "15px",
                    }}
                  >
                    <Typography sx={{ fontSize: "25px" }}>
                      Nicolas, Klinth Vincent O. {"      "}
                    </Typography>

                    <Typography sx={{ color: "text.secondary" }}>
                      BSIT 4A
                    </Typography>
                    <Box>
                      <Grid
                        container
                        sx={{ display: "flex", flexDirection: "row" }}
                      >
                        <Grid sx={{ width: "50%" }}>
                          <Typography sx={{ fontSize: "15px" }}>
                            Gender:
                            <br />
                            Birthday:
                            <br />
                            Address:
                            <br />
                            Nickname:
                            <br />
                            Skills / Languages:
                          </Typography>
                        </Grid>

                        <Grid sx={{ minWidth: "50%" }}>
                          <Typography
                            sx={{
                              fontSize: "15px",
                              color: "text.secondary",
                              textAlign: "right",
                            }}
                          >
                            Male
                            <br />
                            02-24-1997
                            <br />
                            Bustos, Bulacan
                            <br />
                            Nathan
                            <br />
                            Javascript, Python
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      minWidth: "180px",
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                      margin: "15px",
                    }}
                  >
                    <Grid container>
                      <Grid sx={{ width: "50%" }}>
                        <Typography
                          sx={{ fontSize: "15px", textAlign: "left" }}
                        >
                          Teamwork:
                          <br />
                          Creativity:
                          <br />
                          Adaptability:
                          <br />
                          Leadership:
                          <br />
                          Persuasion:
                        </Typography>
                      </Grid>

                      <Grid sx={{ width: "50%" }}>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            color: "text.secondary",
                            textAlign: "right",
                          }}
                        >
                          5.0
                          <br />
                          5.0
                          <br />
                          3.5
                          <br />
                          3.0
                          <br />
                          4.0
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          sx={{ color: "text.primary", fontSize: "20px" }}
          onClick={handleOpen}
        >
          {" "}
          <StarIcon sx={{ color: "yellow" }} /> Add your Rating{" "}
          <StarIcon sx={{ color: "yellow" }} />
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style.modal}>
            <Typography id="modal-modal-title">Rating</Typography>

            <Grid container>
              <Grid sx={{ width: "50%" }}>
                <Typography sx={{ fontSize: "20px", textAlign: "left" }}>
                  Teamwork:
                </Typography>
                <Typography sx={{ fontSize: "20px", textAlign: "left" }}>
                  Creativity:
                </Typography>
                <Typography sx={{ fontSize: "20px", textAlign: "left" }}>
                  Adaptability:
                </Typography>
                <Typography sx={{ fontSize: "20px", textAlign: "left" }}>
                  Leadership:
                </Typography>
                <Typography sx={{ fontSize: "20px", textAlign: "left" }}>
                  Persuasion:
                </Typography>
              </Grid>

              <Grid sx={{ width: "50%" }}>
                <Typography
                  sx={{
                    fontSize: "15px",
                    color: "text.secondary",
                    textAlign: "right",
                  }}
                >
                  <Button sx={style.ratingbutton}>
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarOutlineIcon />
                    <StarOutlineIcon />
                  </Button>
                  <br />
                  <Button sx={style.ratingbutton}>
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarOutlineIcon />
                    <StarOutlineIcon />
                  </Button>
                  <br />
                  <Button sx={style.ratingbutton}>
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarOutlineIcon />
                    <StarOutlineIcon />
                  </Button>
                  <br />
                  <Button sx={style.ratingbutton}>
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarOutlineIcon />
                    <StarOutlineIcon />
                  </Button>
                  <br />
                  <Button sx={style.ratingbutton}>
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarOutlineIcon />
                    <StarOutlineIcon />
                  </Button>
                </Typography>
              </Grid>
            </Grid>
            <Box>
              <TextField sx={{width:"100%", marginTop:"10px"}} type="text" onChange={handleChange("comment")}/>
              <br/>
              <Button onClick={submit}>Submit</Button>
            </Box>

          </Box>
        </Modal>
      </Box>

      <Box sx={style.section2}>
        <Grid container sx={{ display: "flex", flexDirection: "column" }}>
          <Grid sx={style.sort}>
            <Typography color="text.primary">Sort By:</Typography>

            <FormControl sx={{ mx: 2, minWidth: 80 }}>
              <Select sx={{ height: 30 }} autoWidth>
                <MenuItem value={0}>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={2}>Stars</MenuItem>
                <MenuItem value={3}>Most Recent</MenuItem>
              </Select>
            </FormControl>

            <Typography color="text.primary">Filter:</Typography>

            <FormControl sx={{ mx: 2, minWidth: 80, marginBottom: "5px" }}>
              <Select sx={{ height: 30 }} autoWidth>
                <MenuItem value={0}>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>1st Year</MenuItem>
                <MenuItem value={2}>2nd Year</MenuItem>
                <MenuItem value={3}>3rd Year</MenuItem>
                <MenuItem value={4}>4th Year</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid sx={style.marginTop3} id="customcomment">

          </Grid>

          <Grid sx={style.marginTop3}>
            <Card sx={style.card}>
              <CardContent>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Avatar sx={{ mx: "10px" }} src={top1} />
                  <Box>
                    <Typography sx={{ fontSize: "20px" }}>
                      Nicolas, Klinth Vincent O.
                    </Typography>
                    <Typography
                      sx={{ fontSize: "10px", color: "text.secondary" }}
                    >
                      Posted 69 years ago
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ margin: "10px" }}>
                  <Typography sx={style.cardPrimaryText}>
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarOutlineIcon />
                    <StarOutlineIcon />
                  </Typography>
                </Box>
                <Box>Lorem ipsum dolor sit amet, sed dor elusmor tempod</Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid sx={style.marginTop3}>
            <Card sx={style.card}>
              <CardContent>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Avatar sx={{ mx: "10px" }} src={top1} />
                  <Box>
                    <Typography sx={{ fontSize: "20px" }}>
                      Nicolas, Klinth Vincent O.
                    </Typography>
                    <Typography
                      sx={{ fontSize: "10px", color: "text.secondary" }}
                    >
                      Posted 69 years ago
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ margin: "10px" }}>
                  <Typography sx={style.cardPrimaryText}>
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarOutlineIcon />
                    <StarOutlineIcon />
                  </Typography>
                </Box>
                <Box>Lorem ipsum dolor sit amet, sed dor elusmor tempod</Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Divider />
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.background.main,
          marginTop: "5px",
          height: 50,
          position: "static",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Avatar sx={{ margin: "5px", bgcolor: "black", marginTop: "10px" }}>
          <Link href="">
            <FacebookIcon />{" "}
          </Link>
        </Avatar>
        <Avatar sx={{ margin: "5px", bgcolor: "black", marginTop: "10px" }}>
          <Link href="">
            <EmailIcon />{" "}
          </Link>
        </Avatar>
      </Box>

      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.background.main,
          marginTop: "none",
          height: 100,
          position: "static",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Typography sx={{ marginTop: "10px" }} variant="p" color="textPrimary">
          Contact us: support@studentreview.com
          <br />
          © 2021 Student Review. All Rights Reserved.
          <br />
          Terms of Service | Privacy Policy
        </Typography>
      </Box>
    </Box>
  );
}
