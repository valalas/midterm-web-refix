import React, { useState } from "react";
import firebase from "../utils/firebase";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
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
  TableRow,
  TablePagination,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
  Popover,
  TextField,
} from "@mui/material";
//import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { useSelector, useDispatch } from "react-redux";
import { toggleTheme, getTheme } from "../redux/actions/uiAction";
import { isLogged } from "../redux/actions/isLogged";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
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
    alignItems: "center",
    flexWrap: "wrap",
  },

  card: {
    height: {
      xs: "100px",
      sm: "110px",
      md: "120px",
    },
    width: {
      xs: "100%",
      sm: "100%",
      md: "240px",
    },
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
    flexDirection: { xs: "column", sm: "column", md: "row" },
  },

  avatarBox: { width: "30%", height: "100%", display: "flex" },

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
};
//////////////////////////////////////////table api

const db = firebase.firestore();
//////////////////////////////////////////google login start

const provider = new GoogleAuthProvider();
const auth = getAuth();

//////////////////////////////////////////google login end

const columns = [
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
];

//////////////////////////////////////////table api


export default function Index() {
  //////////////////////////////////////login

  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const [state, setState] = React.useState({
    isLoading: true,
    right: false,

  });

  const [profile, setProfile] = React.useState({
    profile: [],
  });
  const handleChange = (prop) => (e) => {
    setPayload({ ...payload, [prop]: e.target.value });
  };

  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);
  useEffect(() => {
    dispatch(getTheme());
  }, [dispatch]);

  const _toggleTheme = () => {
    dispatch(toggleTheme(!ui.isDarkMode));
  };

  /////////////////////////////////////////////drawer

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

        <ListItem>
          <Link color="textPrimary" href="/studeval">
            Blog
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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  /////////////////////////////table end

  /////////////////////////////////////popover start
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  //////////////////////////////////popover end
  const loginGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        //const credential = GoogleAuthProvider.credentialFromResult(result);
        //const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        localStorage.setItem("userid", user.uid);
        dispatch(isLogged(user.uid));
        setProfile({
          name: user.displayName,
          id: user.uid,
          email: user.email,
          phone: user.phoneNumber,
          photoURL: user.photoURL,
        });
        console.log(profile);
        //TODO if userid exists IN USERS db then use update IF NULL use set
        db.collection("users").doc(user.uid).update({
          id: user.uid,
          name: user.displayName,
          email: user.email,
          phone: user.phoneNumber,
          photoURL: user.photoURL,
        });

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        //const errorCode = error.code;
        //const errorMessage = error.message;
        // The email of the user's account used.
        //const email = error.email;
        // The AuthCredential type that was used.
        //const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const logoutGoogle = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        alert("SIGNED OUT");
        localStorage.clear();
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <Box sx={style.root}>
      <AppBar position="static" sx={style.appbar}>
        <Toolbar sx={{ paddingLeft: 2 }}>
          <Typography color="textPrimary" sx={style.menuLink2}>
            Student Review
          </Typography>
          <Box component="span" sx={{ flexGrow: 1 }} />

          <Link href="/index" sx={{ underline: "3px solid black" }}>
            <Typography color="textPrimary" sx={style.menuLink}>
              {" "}
              Student List{" "}
            </Typography>
          </Link>

          <Link href="/studeval" underline="none">
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
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
            sx={{ marginLeft: "10px" }}
          >
            <AccountCircleIcon />
          </IconButton>
          <Popover
            sx={{ alignItems: "center" }}
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography sx={{ p: 2 }}>Log In</Typography>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              onChange={handleChange("email")}
              value={payload.email}
            />
            <br />
            <TextField
              type="password"
              id="password"
              label="Password"
              variant="outlined"
              onChange={handleChange("password")}
              value={payload.password}
            />
            <br />
            <Button variant="contained" onClick={loginGoogle}>
              {" "}
              LOG IN
            </Button>
            <Button variant="contained" onClick={logoutGoogle}>
              {" "}
              LOG OUT
            </Button>
          </Popover>

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
          <Typography color="textPrimary">Top Students</Typography>
        </Box>
        <Box>
          <Grid container sx={style.cardContainer}>
            <Grid sx={style.colContainer}>
              <Card sx={style.card}>
                <CardContent sx={style.cardContent}>
                  <Box sx={style.avatarBox}>
                    <Avatar src={top1} />
                  </Box>
                  <Box>
                 
                      <Typography sx={style.cardPrimaryText}>
                       
                      </Typography>
       
                    <Typography sx={style.cardSecondaryText}>
                      30 Reviews
                    </Typography>

                    <Typography sx={style.cardPrimaryText}>
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarOutlineIcon />
                      <StarOutlineIcon />
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid sx={style.colContainer}>
              <Card sx={style.card}>
                <CardContent sx={style.cardContent}>
                  <Box sx={style.avatarBox}>
                    <Avatar src={top1} />
                  </Box>
                  <Box>
                    <Typography sx={style.cardPrimaryText}>
                      Klinth Nicolas
                    </Typography>
                    <Typography sx={style.cardSecondaryText}>
                      30 Reviews
                    </Typography>

                    <Typography sx={style.cardPrimaryText}>
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarOutlineIcon />
                      <StarOutlineIcon />
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid sx={style.colContainer}>
              <Card sx={style.card}>
                <CardContent sx={style.cardContent}>
                  <Box sx={style.avatarBox}>
                    <Avatar src={top1} />
                  </Box>
                  <Box>
                    <Typography sx={style.cardPrimaryText}>
                      Klinth Nicolas
                    </Typography>
                    <Typography sx={style.cardSecondaryText}>
                      30 Reviews
                    </Typography>

                    <Typography sx={style.cardPrimaryText}>
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarOutlineIcon />
                      <StarOutlineIcon />
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid sx={style.colContainer}>
              <Card sx={style.card}>
                <CardContent sx={style.cardContent}>
                  <Box sx={style.avatarBox}>
                    <Avatar src={top1} />
                  </Box>
                  <Box>
                    <Typography sx={style.cardPrimaryText}>
                      Klinth Nicolas
                    </Typography>
                    <Typography sx={style.cardSecondaryText}>
                      30 Reviews
                    </Typography>

                    <Typography sx={style.cardPrimaryText}>
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarOutlineIcon />
                      <StarOutlineIcon />
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box sx={style.section2}>
        <Grid container>
          <Grid sx={style.sort}>
            <Typography color="text.primary">Sort By:</Typography>

            <FormControl sx={{ mx: 2, minWidth: 80 }}>
              <Select sx={{ height: 30 }} autoWidth>
                <MenuItem value={0}>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Name</MenuItem>
                <MenuItem value={2}>Stars</MenuItem>
                <MenuItem value={3}>Most Recent</MenuItem>
              </Select>
            </FormControl>

            <Typography color="text.primary">Filter:</Typography>

            <FormControl sx={{ mx: 2, minWidth: 80 }}>
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

          <Grid /*sx={style.colContainer}*/ sx={style.studentlist}>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 600 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow hover role="checkbox" tabIndex={-1}>
                      <TableCell>
                        <Avatar src={top1} />
                      </TableCell>
                      <TableCell>klinth Nicolas</TableCell>
                      <TableCell>BSIT 4B</TableCell>
                      <TableCell>30</TableCell>
                      <TableCell>
                        <Typography>
                          <StarIcon />
                          <StarIcon />
                          <StarIcon />
                          <StarOutlineIcon />
                          <StarOutlineIcon />
                        </Typography>
                      </TableCell>
                    </TableRow>

                    <TableRow hover role="checkbox" tabIndex={-1}>
                      <TableCell>
                        <Avatar src={top1} />
                      </TableCell>
                      <TableCell>klinth Nicolas</TableCell>
                      <TableCell>BSIT 4B</TableCell>
                      <TableCell>30</TableCell>
                      <TableCell>
                        <Typography>
                          <StarIcon />
                          <StarIcon />
                          <StarIcon />
                          <StarOutlineIcon />
                          <StarOutlineIcon />
                        </Typography>
                      </TableCell>
                    </TableRow>

                    <TableRow hover role="checkbox" tabIndex={-1}>
                      <TableCell>
                        <Avatar src={top1} />
                      </TableCell>
                      <TableCell>klinth Nicolas</TableCell>
                      <TableCell>BSIT 4B</TableCell>
                      <TableCell>30</TableCell>
                      <TableCell>
                        <Typography>
                          <StarIcon />
                          <StarIcon />
                          <StarIcon />
                          <StarOutlineIcon />
                          <StarOutlineIcon />
                        </Typography>
                      </TableCell>
                    </TableRow>

                    <TableRow hover role="checkbox" tabIndex={-1}>
                      <TableCell>
                        <Avatar src={top1} />
                      </TableCell>
                      <TableCell>klinth Nicolas</TableCell>
                      <TableCell>BSIT 4B</TableCell>
                      <TableCell>30</TableCell>
                      <TableCell>
                        <Typography>
                          <StarIcon />
                          <StarIcon />
                          <StarIcon />
                          <StarOutlineIcon />
                          <StarOutlineIcon />
                        </Typography>
                      </TableCell>
                    </TableRow>

                    <TableRow hover role="checkbox" tabIndex={-1}>
                      <TableCell>
                        <Avatar src={top1} />
                      </TableCell>
                      <TableCell>klinth Nicolas</TableCell>
                      <TableCell>BSIT 4B</TableCell>
                      <TableCell>30</TableCell>
                      <TableCell>
                        <Typography>
                          <StarIcon />
                          <StarIcon />
                          <StarIcon />
                          <StarOutlineIcon />
                          <StarOutlineIcon />
                        </Typography>
                      </TableCell>
                    </TableRow>

                    <TableRow hover role="checkbox" tabIndex={-1}>
                      <TableCell>
                        <Avatar src={top1} />
                      </TableCell>
                      <TableCell>klinth Nicolas</TableCell>
                      <TableCell>BSIT 4B</TableCell>
                      <TableCell>30</TableCell>
                      <TableCell>
                        <Typography>
                          <StarIcon />
                          <StarIcon />
                          <StarIcon />
                          <StarOutlineIcon />
                          <StarOutlineIcon />
                        </Typography>
                      </TableCell>
                    </TableRow>

                    <TableRow hover role="checkbox" tabIndex={-1}>
                      <TableCell>
                        <Avatar src={top1} />
                      </TableCell>
                      <TableCell>klinth Nicolas</TableCell>
                      <TableCell>BSIT 4B</TableCell>
                      <TableCell>30</TableCell>
                      <TableCell>
                        <Typography>
                          <StarIcon />
                          <StarIcon />
                          <StarIcon />
                          <StarOutlineIcon />
                          <StarOutlineIcon />
                        </Typography>
                      </TableCell>
                    </TableRow>

                    <TableRow hover role="checkbox" tabIndex={-1}>
                      <TableCell>
                        <Avatar src={top1} />
                      </TableCell>
                      <TableCell>klinth Nicolas</TableCell>
                      <TableCell>BSIT 4B</TableCell>
                      <TableCell>30</TableCell>
                      <TableCell>
                        <Typography>
                          <StarIcon />
                          <StarIcon />
                          <StarIcon />
                          <StarOutlineIcon />
                          <StarOutlineIcon />
                        </Typography>
                      </TableCell>
                    </TableRow>

                    <TableRow hover role="checkbox" tabIndex={-1}>
                      <TableCell>
                        <Avatar src={top1} />
                      </TableCell>
                      <TableCell>klinth Nicolas</TableCell>
                      <TableCell>BSIT 4B</TableCell>
                      <TableCell>30</TableCell>
                      <TableCell>
                        <Typography>
                          <StarIcon />
                          <StarIcon />
                          <StarIcon />
                          <StarOutlineIcon />
                          <StarOutlineIcon />
                        </Typography>
                      </TableCell>
                    </TableRow>

                    <TableRow hover role="checkbox" tabIndex={-1}>
                      <TableCell>
                        <Avatar src={top1} />
                      </TableCell>
                      <TableCell>klinth Nicolas</TableCell>
                      <TableCell>BSIT 4B</TableCell>
                      <TableCell>30</TableCell>
                      <TableCell>
                        <Typography>
                          <StarIcon />
                          <StarIcon />
                          <StarIcon />
                          <StarOutlineIcon />
                          <StarOutlineIcon />
                        </Typography>
                      </TableCell>
                    </TableRow>

                    <TableRow hover role="checkbox" tabIndex={-1}>
                      <TableCell>
                        <Avatar src={top1} />
                      </TableCell>
                      <TableCell>Ace Valmadrid</TableCell>
                      <TableCell>BSIT 4B</TableCell>
                      <TableCell>30</TableCell>
                      <TableCell>
                        <Typography>
                          <StarIcon />
                          <StarIcon />
                          <StarIcon />
                          <StarOutlineIcon />
                          <StarOutlineIcon />
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count="20"
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
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
