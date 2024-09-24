import React from 'react'
import { Box, Container, Stack, Tabs, Tab } from '@mui/material';
import { Clock, Receipt, House, Chat, User } from 'lucide-react';

const Layout = ({ children }) => {
  return (
    <Box sx={{ height: "100vh", width: "100vw", overflowX: "hidden" }}>
      <Container maxWidth="md" sx={{ height: 1 }}>
        <Stack sx={{ height: 1 }}>
          {/* Outlet */}

          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            sx={{ pb: 4 }}
          >
            <Tab icon={<Clock size={24} />} aria-label="Komisyon" />
            <Tab icon={<Receipt size={24} />} aria-label="Sipariş geçmişi" />
            <Tab icon={<House size={24} />} aria-label="Ana sayfa" />
            <Tab icon={<Chat size={24} />} aria-label="Sohbet" />
            <Tab icon={<User size={24} />} aria-label="Profil" />
          </Tabs>
        </Stack>
      </Container>
    </Box>
  )
}

export default Layout;
