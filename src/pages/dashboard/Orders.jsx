import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

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

export default function Orders() {
  const [value, setValue] = React.useState(0);

  const { balance } = useSelector((state) => state.app.user);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Stack spacing={2}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          pt={2}
          pb={2}
        >
          <Stack spacing={1} maxWidth="150px">
            <Typography variant="subtitle1">Second Purchase Record</Typography>
            <Typography variant="caption">
              This data is provided by major official cooperatives
            </Typography>
          </Stack>
          <Stack maxWidth={"150px"} alignItems="end">
            <Typography variant="subtitle1">${balance}</Typography>
            <Typography variant="caption" textAlign="end">
              Remaining available assets(in USD)
            </Typography>
          </Stack>
        </Stack>
        <Divider />

        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              variant="fullWidth"
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Pending" {...a11yProps(0)} />
              <Tab label="Completed" {...a11yProps(1)} />
              <Tab label="Frozen" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <OrderCard />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <OrderCard />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <OrderCard />
          </CustomTabPanel>
        </Box>
      </Stack>
    </Box>
  );
}

const OrderCard = () => {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Stack spacing={1}>
            <Typography variant="caption">
              Second Purchase time: {new Date(Date.now()).toUTCString()}
            </Typography>
            <Typography variant="caption">
              Second Purchase number: UB2408190158539518
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="end"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <img
                src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                style={{ maxWidth: "100px" }}
              />
              <Stack spacing={0.5}>
                <Typography variant="button">Product Name</Typography>
                <Typography variant="body2">$1827</Typography>
              </Stack>
            </Stack>
            <Typography>X 1</Typography>
          </Stack>

          <Divider />

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body2" fontSize={14}>
              Total order amount
            </Typography>
            <Typography variant="button" color="text.secondary">
              $1827
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body2" fontSize={14}>
              Commission
            </Typography>
            <Typography variant="button" color="text.secondary">
              $5.24
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body2" fontSize={14}>
              Estimated commission return
            </Typography>
            <Typography variant="caption" fontSize={24} color="warning">
              $1234
            </Typography>
          </Stack>
          <Button variant="outlined">Mark as completed</Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
