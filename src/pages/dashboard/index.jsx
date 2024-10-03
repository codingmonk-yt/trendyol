import { Box, Container, Stack, Tab, Tabs } from "@mui/material";
import React, { useEffect } from "react";
import { Clock, Receipt, House, User, Chat } from "@phosphor-icons/react";
import Home from "./Home";
import Orders from "./Orders";
import Commission from "./Commission";
import Profile from "./Profile";
import Connect from "./Connect";
import { useDispatch, useSelector } from "react-redux";
import { UpdateSelectedTab } from "../../redux/slices/user";
import Withdraw from "../../components/Withdraw";
import Recharge from "../../components/Recharge";
import LinkedAccount from "../../components/LinkedAccount";

import { alpha } from "@mui/material/styles";
import { GetMe, ResetCooldown } from "../../redux/slices/app";

import BackgroundImageOne from "../../assets/bg-1.jpg";
import BackgroundImageTwo from "../../assets/bg-2.jpg";
import BackgroundImageThree from "../../assets/bg-3.jpg";

function App() {
  const dispatch = useDispatch();
  const { tab, rechargeOpen, withdrawOpen, linkAccountOpen } = useSelector(
    (state) => state.user
  );

  const handleChange = (event, newValue) => {
    dispatch(UpdateSelectedTab(newValue));
  };

  useEffect(() => {
    dispatch(ResetCooldown());
  }, []);

  useEffect(() => {
    // İlk gönderim
    dispatch(GetMe());

    // Her 10 saniyede bir GetMe göndermek için bir aralık ayarlayın
    const interval = setInterval(() => {
      dispatch(GetMe());
    }, 10000);

    // Bileşen kaldırıldığında aralığı temizle
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          overflowX: "hidden",
          bgcolor: (theme) => alpha(theme.palette.warning.lighter, 0.5),
          background: (theme) =>
            `linear-gradient(180deg, ${alpha(
              theme.palette.primary.main,
              0.7
            )}, ${alpha(theme.palette.primary.main, 0.3)}), url(${
              tab === 0 || tab === 2 || tab === 4
                ? BackgroundImageTwo
                : BackgroundImageThree
            })`,
          backgroundSize: "cover", // Ensure the background image covers all space
          backgroundRepeat: "no-repeat", // Prevent the image from repeating
          backgroundPosition: "center", // Center the image
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            px: 1,
            background: (theme) => alpha(theme.palette.common.white, 0.7),
          }}
        >
          <Stack sx={{ height: 1 }}>
            {/* Çıkış */}

            {(() => {
              switch (tab) {
                case 0:
                  return <Commission />;
                case 1:
                  return <Orders />;
                case 2:
                  return <Home />;
                case 3:
                  return <Connect />;
                case 4:
                  return <Profile />;

                default:
                  break;
              }
            })()}

            <Tabs
              value={tab}
              onChange={handleChange}
              variant="fullWidth"
              sx={{
                position: "fixed",
                bottom: 0,
                right: 0,
                left: 0,
                bgcolor: (theme) => theme.palette.background.paper,
                borderTop: (theme) => `2px solid ${theme.palette.divider}`,
              }}
            >
              <Tab icon={<Clock size={20} />} aria-label="Komisyon" />
              <Tab icon={<Receipt size={20} />} aria-label="Sipariş geçmişi" />
              <Tab icon={<House size={20} />} aria-label="Ana sayfa" />
              <Tab icon={<Chat size={20} />} aria-label="Sohbet" />
              <Tab icon={<User size={20} />} aria-label="Profil" />
            </Tabs>
          </Stack>
        </Container>
      </Box>

      {withdrawOpen && <Withdraw open={withdrawOpen} />}
      {rechargeOpen && <Recharge open={rechargeOpen} />}
      {linkAccountOpen && <LinkedAccount open={linkAccountOpen} />}
    </>
  );
}

export default App;
