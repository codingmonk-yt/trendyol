import {
  Box,
  Container,
  Divider,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import Users from "./Users";
import Tasks from "./Tasks";
import Recharge from "./Recharge";
import Withdraw from "./Withdraw";
import { SignOut } from "@phosphor-icons/react";
import { useDispatch } from "react-redux";
import { LogoutUser } from "../../redux/slices/app";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Home() {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Stack spacing={4} py={4}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h4">Admin</Typography>

          <IconButton
            onClick={() => {
              dispatch(LogoutUser());
            }}
          >
            <SignOut />
          </IconButton>
        </Stack>

        <Divider />

        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Users" {...a11yProps(0)} />
              <Tab label="Tasks" {...a11yProps(1)} />
              <Tab label="Recharge Requests" {...a11yProps(2)} />
              <Tab label="Withdraw Requests" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Users />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Tasks />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Recharge />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <Withdraw />
          </CustomTabPanel>
        </Box>
      </Stack>
    </Container>
  );
}
