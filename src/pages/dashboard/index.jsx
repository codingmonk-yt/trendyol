import { Box, Container, Stack, Tab, Tabs } from "@mui/material";
import React from "react";
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

function App() {
  const dispatch = useDispatch();
  const { tab, rechargeOpen, withdrawOpen, linkAccountOpen } = useSelector(
    (state) => state.user
  );

  const handleChange = (event, newValue) => {
    dispatch(UpdateSelectedTab(newValue));
  };

  return (
    <>
      <Box sx={{ height: "100vh", width: "100vw", overflowX: "hidden" }}>
        <Container maxWidth="md" sx={{ height: 1, px: 1 }}>
          <Stack sx={{ height: 1 }}>
            {/* Outlet */}

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

                  break;

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
              <Tab fu icon={<Clock size={20} />} aria-label="Commision" />
              <Tab icon={<Receipt size={20} />} aria-label="Order history" />
              <Tab icon={<House size={20} />} aria-label="Home" />
              <Tab icon={<Chat size={20} />} aria-label="Chat" />
              <Tab icon={<User size={20} />} aria-label="Profile" />
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
