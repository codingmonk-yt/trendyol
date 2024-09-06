import React from 'react'

const Layout = ({children}) => {
  return (
    <Box sx={{ height: "100vh", width: "100vw", overflowX: "hidden" }}>
        <Container maxWidth="sm" sx={{ height: 1 }}>
          <Stack sx={{ height: 1 }}>
            {/* Outlet */}
            

            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              sx={{ pb: 4 }}
            >
              <Tab fu icon={<Clock size={24} />} aria-label="Commision" />
              <Tab icon={<Receipt size={24} />} aria-label="Order history" />
              <Tab icon={<House size={24} />} aria-label="Home" />
              <Tab icon={<Chat size={24} />} aria-label="Chat" />
              <Tab icon={<User size={24} />} aria-label="Profile" />
            </Tabs>
          </Stack>
        </Container>
      </Box>
  )
}

export default Layout