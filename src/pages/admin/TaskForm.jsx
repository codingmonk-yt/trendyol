import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
  } from "@mui/material";
  import Grid from "@mui/material/Grid2";
  import React from "react";
  
  export default function TaskForm({ open, handleClose }) {
    // State for each form field
    const [purchaseDateTime, setPurchaseDateTime] = React.useState("");
    const [purchaseNumber, setPurchaseNumber] = React.useState("");
    const [productName, setProductName] = React.useState("");
    const [pricePerUnit, setPricePerUnit] = React.useState("");
    const [quantity, setQuantity] = React.useState("");
    const [totalAmount, setTotalAmount] = React.useState("");
    const [commission, setCommission] = React.useState("");
    const [commissionReturn, setCommissionReturn] = React.useState("");
    const [imageLink, setImageLink] = React.useState("");
    const [assignedTo, setAssignedTo] = React.useState("");
  
    // Handlers for each input change
    const handlePurchaseDateTimeChange = (event) => {
      setPurchaseDateTime(event.target.value);
    };
  
    const handlePurchaseNumberChange = (event) => {
      setPurchaseNumber(event.target.value);
    };
  
    const handleProductNameChange = (event) => {
      setProductName(event.target.value);
    };
  
    const handlePricePerUnitChange = (event) => {
      setPricePerUnit(event.target.value);
    };
  
    const handleQuantityChange = (event) => {
      setQuantity(event.target.value);
    };
  
    const handleTotalAmountChange = (event) => {
      setTotalAmount(event.target.value);
    };
  
    const handleCommissionChange = (event) => {
      setCommission(event.target.value);
    };
  
    const handleCommissionReturnChange = (event) => {
      setCommissionReturn(event.target.value);
    };
  
    const handleImageLinkChange = (event) => {
      setImageLink(event.target.value);
    };
  
    const handleChangeAssignment = (event) => {
      setAssignedTo(event.target.value);
    };
  
    return (
      <Dialog open={open} maxWidth="md" fullWidth>
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid size={6}>
                <TextField
                  type="date"
                  fullWidth
                //   label="Purchase Date Time"
                  value={purchaseDateTime}
                  onChange={handlePurchaseDateTimeChange}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  type="text"
                  fullWidth
                  label="Purchase Number"
                  value={purchaseNumber}
                  onChange={handlePurchaseNumberChange}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  type="text"
                  fullWidth
                  label="Product Name"
                  value={productName}
                  onChange={handleProductNameChange}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  type="number"
                  min={0}
                  fullWidth
                  label="Price per unit"
                  value={pricePerUnit}
                  onChange={handlePricePerUnitChange}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  type="number"
                  min={1}
                  fullWidth
                  label="Quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  type="number"
                  min={0}
                  fullWidth
                  label="Total Amount"
                  value={totalAmount}
                  onChange={handleTotalAmountChange}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  type="number"
                  min={0}
                  fullWidth
                  label="Commission"
                  value={commission}
                  onChange={handleCommissionChange}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  type="number"
                  min={0}
                  fullWidth
                  label="Commission Return"
                  value={commissionReturn}
                  onChange={handleCommissionReturnChange}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  type="text"
                  fullWidth
                  label="Image Link"
                  value={imageLink}
                  onChange={handleImageLinkChange}
                />
              </Grid>
              <Grid size={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Assign to</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={assignedTo}
                    label="Assign to"
                    onChange={handleChangeAssignment}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button fullWidth variant="contained" color="primary">
            Submit
          </Button>
          <Button
            onClick={handleClose}
            fullWidth
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  