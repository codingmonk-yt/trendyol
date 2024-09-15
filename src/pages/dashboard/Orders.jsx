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
  UpdateRechargeDialog,
  UpdateTaskStatus,
} from "../../redux/slices/user";
import { CheckCircle } from "@phosphor-icons/react";

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

export default function Orders() {
  const dispatch = useDispatch();

  const { tasks } = useSelector((state) => state.user);

  const [value, setValue] = React.useState(0);

  const { balance } = useSelector((state) => state.app.user);

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
            <Stack spacing={2}>
              {tasks.filter((e) => e?.status === "pending").length > 0 ? (
                balance * 1 >=
                tasks.filter((e) => e?.status === "pending")[0]?.totalAmount *
                  1 ? (
                  tasks
                    .filter((e) => e?.status === "pending")
                    .map((el, index) => (
                      <OrderCard disabled={index !== 0} {...el} key={el._id} />
                    ))
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
                            ${balance}
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
                            {tasks.filter((e) => e.status === "pending")[0]
                              ?.totalAmount * 1}
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
                    <Stack alignItems="center" justifyContent="center" spacing={2}>
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

const OrderCard = ({ disabled, ...el }) => {
  const dispatch = useDispatch();

  return (
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
                Second Purchase time: {el.purchaseTime}
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
                dispatch(UpdateTaskStatus(el._id));
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
  );
};
