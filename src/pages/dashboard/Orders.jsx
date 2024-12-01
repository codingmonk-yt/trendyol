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
import { GetMyTasks, UpdateRechargeDialog } from "../../redux/slices/user";
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

export default function Orders() {
  const dispatch = useDispatch();

  const { cooldown, cooldownTimestamp } = useSelector((state) => state.app);

  const { tasks } = useSelector((state) => state.user);

  const [value, setValue] = React.useState(0);

  const { balance } = useSelector((state) => state.app.user);

  const [timeLeft, setTimeLeft] = React.useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Calculate time left for cooldown
  useEffect(() => {
    if (cooldown && cooldownTimestamp > Date.now()) {
      const interval = setInterval(() => {
        const now = Date.now();
        const timeDiff = cooldownTimestamp - now;
        if (timeDiff > 0) {
          const minutes = Math.floor(timeDiff / 60000);
          const seconds = Math.floor((timeDiff % 60000) / 1000);
          setTimeLeft(
            `${minutes.toString().padStart(2, "0")}:${seconds
              .toString()
              .padStart(2, "0")}`
          );
        } else {
          clearInterval(interval);
          setTimeLeft(null);
        }
      }, 1000);

      return () => clearInterval(interval); // Cleanup on component unmount
    }
  }, [cooldown, cooldownTimestamp]);

  useEffect(() => {
    dispatch(GetMyTasks());
  }, [dispatch]);

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
            <Typography variant="subtitle1">İkinci Satın Alma Kaydı</Typography>
            <Typography variant="caption">
              Bu veri büyük resmi kooperatifler tarafından sağlanmaktadır
            </Typography>
          </Stack>
          <Stack maxWidth={"150px"} alignItems="end">
            <Typography variant="subtitle1">
              TL {(balance * 1).toFixed(2)}
            </Typography>
            <Typography variant="caption" textAlign="end">
              Kalan kullanılabilir varlıklar (TL cinsinden)
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
              aria-label="temel sekmeler örneği"
            >
              <Tab label="Bekleyen" {...a11yProps(0)} />
              <Tab label="Tamamlanan" {...a11yProps(1)} />
              <Tab label="Dondurulan" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Stack spacing={2}>
              {tasks.filter((e) => e?.status === "pending").length > 0 ? (
                cooldown && timeLeft ? (
                  <Card>
                    <CardContent>
                      <Stack direction="column" spacing={3}>
                        <Typography variant="subtitle1">
                        Bir Sonraki Görev İçin Kalan Zaman Lütfen Bekleyin
                        </Typography>
                        {timeLeft && (
                          <Typography variant="h6" color="error">
                            Time Left: {timeLeft}
                          </Typography>
                        )}
                      </Stack>
                    </CardContent>
                  </Card>
                ) : (
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
                          nextId={array[index + 1]?._id || null} // Sonraki öğenin _id'sini veya null'ı geç
                          isLast={index === array.length - 1} // Son öğe olup olmadığını kontrol et
                        />
                      )
                    )
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
                        Bekleyen Görev Yok
                      </Typography>
                      <Typography variant="subtitle1" color="success">
                        Bugün tüm görevlerinizi tamamladınız 🥳🥳!!
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
                  İkinci Satın Alma Zamanı:
                  {el.status === "pending" && disabled
                    ? "Atanacak"
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
                  İkinci Satın Alma Numarası: {el.purchaseNumber}
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
                  <Typography variant="caption">
                    Yönetici Tarafından Onaylandı
                  </Typography>
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
                  <Typography variant="body2">TL {el.pricePerUnit}</Typography>
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
                Toplam Sipariş Tutarı
              </Typography>
              <Typography variant="button" color="text.secondary">
                TL {el?.totalAmount}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="body2" fontSize={14}>
                Komisyon
              </Typography>
              <Typography variant="button" color="text.secondary">
                TL {el.commission}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="body2" fontSize={14}>
                Tahmini Komisyon Getirisi
              </Typography>
              <Typography variant="caption" fontSize={24} color="warning">
                TL {el.commissionReturn}
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
                Siparişi Onayla
              </Button>
            ) : el.status === "completed" ? (
              <Chip
                label="Tamamlandı"
                variant="filled"
                color="success"
                sx={{ width: 1 }}
              />
            ) : (
              <Button variant="contained" disabled>
                Donmuş
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
