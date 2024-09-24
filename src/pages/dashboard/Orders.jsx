import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  GetMyTasks,
  GetWaitTill,
  UpdateRechargeDialog,
  UpdateTaskStatus,
} from "../../redux/slices/user";
import { CheckCircle } from "@phosphor-icons/react";
import OrderConfirmation from "./OrderConfirmation";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ overflow: "auto", height: "Calc(100vh - 254px)" }}
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

const checkIf15MinutesElapsed = (waitTill) => {
  if (!waitTill) {
    return false; // If waitTill is null or undefined, return false
  }
  const waitTillDate = new Date(waitTill); // MongoDB timestamp with 15 minutes already added
  const currentTime = new Date();
  
  return currentTime >= waitTillDate; // Check if current time has passed the waitTill time
};


export default function Orders() {
  const dispatch = useDispatch();

  const { tasks } = useSelector((state) => state.user);

  const [value, setValue] = React.useState(0);

  const { balance } = useSelector((state) => state.app.user);

  const { waitTill } = useSelector((state) => state.user);

  const [has15MinutesElapsed, setHas15MinutesElapsed] = useState(false);

  useEffect(() => {
    if (!waitTill) return; // Exit early if waitTill is null
  
    // Function to perform the check every 5 seconds
    const interval = setInterval(() => {
      const hasElapsed = checkIf15MinutesElapsed(waitTill);
      setHas15MinutesElapsed(hasElapsed);
    }, 5000); // Check every 5 seconds (5000 ms)
  
    // Cleanup the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [waitTill]);
  

  useEffect(() => {
    // Initial dispatch
    dispatch(GetWaitTill());

    // Set an interval to dispatch GetMe every 10 seconds
    const interval = setInterval(() => {
      dispatch(GetWaitTill());
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(GetMyTasks());
  }, []);

  return (
    <Box>
      <Stack spacing={2}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          pt={2}
          pb={2}
          px={2}
        >
          <Stack spacing={1} maxWidth="150px">
            <Typography variant="subtitle1">Second Purchase Record</Typography>
            <Typography variant="caption">
              This data is provided by major official cooperatives
            </Typography>
          </Stack>
          <Stack maxWidth={"150px"} alignItems="end">
            <Typography variant="subtitle1">
              ${(balance * 1).toFixed(2)}
            </Typography>
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
            <Stack spacing={2}>
              {console.log(waitTill)}
              {/* {waitTill && !has15MinutesElapsed ?  */}
              {false ? 
              (
                <Card>
                  <CardContent>
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      spacing={2}
                    >
                      <Typography
                        variant="subtitle1"
                        color="success"
                        textAlign="center"
                      >
                        Congratulations you have successfully completed your
                        first five tasks 🥳🥳!!
                        <br />
                        PLEASE CONTACT YOUR REPRESENTATIVE
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              ) : tasks.filter((e) => e?.status === "pending").length > 0 ? (
                balance * 1 >=
                tasks.filter((e) => e?.status === "pending")[0]?.totalAmount *
                  1 ? (
                  tasks
                    .filter((e) => e?.status === "pending")
                    .map((el, index, array) =>
                      index !== 0 ? (
                        <div key={el._id}></div>
                      ) : (
                        <OrderCard
                          disabled={index !== 0}
                          {...el}
                          key={el._id}
                          nextId={array[index + 1]?._id || null} // Pass the _id of the next element or null
                          isLast={index === array.length - 1} // Check if it's the last element
                        />
                      )
                    )
                ) : (
                  <Card>
                    <CardContent>
                      <Stack spacing={2}>
                        <Typography textAlign="center" variant="h6">
                          Please recharge to take next task
                        </Typography>
                        <Divider />
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Typography variant="subtitle2">
                            Current Balance
                          </Typography>
                          <Typography variant="subtitle1" color="primary">
                            ${(balance * 1).toFixed(2)}
                          </Typography>
                        </Stack>
                        <Divider />
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Typography variant="subtitle2">
                            Min. required balance for next task
                          </Typography>
                          <Typography variant="subtitle1" color="primary">
                            $
                            {(
                              tasks.filter((e) => e.status === "pending")[0]
                                ?.totalAmount * 1
                            ).toFixed(2)}
                          </Typography>
                        </Stack>
                        <Divider />
                        <Button
                          variant="contained"
                          fullWidth
                          onClick={() => {
                            dispatch(UpdateRechargeDialog(true));
                          }}
                        >
                          Recharge
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                )
              ) : (
                <Card>
                  <CardContent>
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      spacing={2}
                    >
                      <Typography variant="h6" color="primary">
                        No Pending Tasks
                      </Typography>
                      <Typography variant="subtitle1" color="success  ">
                        You have completed all tasks for today 🥳🥳!!
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              )}
            </Stack>

            {/* <OrderCard /> */}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Stack spacing={2}>
              {tasks
                .filter((e) => e.status === "completed")
                .map((el) => (
                  <OrderCard {...el} key={el._id} />
                ))}
            </Stack>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Stack spacing={2}>
              {tasks
                .filter((e) => e.status === "frozen")
                .map((el) => (
                  <OrderCard {...el} key={el._id} />
                ))}
            </Stack>
          </CustomTabPanel>
        </Box>
      </Stack>
    </Box>
  );
}

const OrderCard = ({ disabled, nextId, isLast, ...el }) => {
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prev) => !prev);
  };
  return (
    <>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack spacing={1}>
                <Typography variant="caption">
                  Second Purchase time:
                  {el.status === "pending" && disabled
                    ? "To be assigned"
                    : new Date(el.purchaseTime).toLocaleString("tr-TR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                      })}
                </Typography>

                <Typography variant="caption">
                  Second Purchase number: {el.purchaseNumber}
                </Typography>
              </Stack>

              {el.approvedByAdmin && (
                <Stack
                  sx={{
                    color: (theme) => theme.palette.success.main,
                    textAlign: "center",
                  }}
                  spacing={2}
                  alignItems="center"
                >
                  <CheckCircle size={40} />
                  <Typography variant="caption">Approved By Admin</Typography>
                </Stack>
              )}
            </Stack>
            <Stack
              direction="row"
              alignItems="end"
              justifyContent="space-between"
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <img src={el.imgUrl} style={{ maxWidth: "100px" }} />
                <Stack spacing={0.5}>
                  <Typography variant="button">{el.name}</Typography>
                  <Typography variant="body2">${el.pricePerUnit}</Typography>
                </Stack>
              </Stack>
              <Typography>X {el.quantity}</Typography>
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
                ${el?.totalAmount}
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
                ${el.commission}
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
                ${el.commissionReturn}
              </Typography>
            </Stack>
            {el.status === "pending" ? (
              <Button
                disabled={disabled}
                onClick={() => {
                  handleToggle();
                }}
                variant="outlined"
              >
                Siparişi onayla
              </Button>
            ) : el.status === "completed" ? (
              <Chip
                label="Completed"
                variant="filled"
                color="success"
                sx={{ width: 1 }}
              />
            ) : (
              <Button variant="contained" disabled>
                Frozen
              </Button>
            )}
          </Stack>
        </CardContent>
      </Card>
      {open && (
        <OrderConfirmation
          open={open}
          handleClose={handleToggle}
          {...el}
          nextId={nextId}
          isLast={isLast}
        />
      )}
    </>
  );
};
