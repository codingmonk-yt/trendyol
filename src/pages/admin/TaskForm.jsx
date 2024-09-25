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
import { Phone } from "@phosphor-icons/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateTask } from "../../redux/slices/admin";

export default function TaskForm({ open, handleClose }) {
  const { users } = useSelector((state) => state.admin);

  const dispatch = useDispatch();

  // Her form alanı için state
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

  // Her giriş değişikliği için handlerlar
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

  const handleSubmitForm = () => {
    if (
      !purchaseDateTime ||
      !purchaseNumber ||
      !productName ||
      !pricePerUnit ||
      !quantity ||
      !totalAmount ||
      !commission ||
      !commissionReturn ||
      !imageLink ||
      !assignedTo
    ) {
      alert("Lütfen tüm gerekli alanları doldurun.");
      return;
    }

    // Schema'ya göre formValues nesnesini oluşturma
    const formValues = {
      purchaseTime: new Date(purchaseDateTime), // Tarih formatına dönüştürme
      purchaseNumber,
      name: productName,
      pricePerUnit: parseFloat(pricePerUnit),
      quantity: parseInt(quantity),
      totalAmount: parseFloat(totalAmount),
      commission: parseFloat(commission),
      commissionReturn: parseFloat(commissionReturn),
      imgUrl: imageLink,
      assignedTo,
      status: "pending", // varsayılan durum
    };

    dispatch(CreateTask(formValues));
    handleClose();
  };

  return (
    <Dialog open={open} maxWidth="md" fullWidth scroll="body">
      <DialogTitle>Görev Ekle</DialogTitle>
      <DialogContent>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <TextField
                type="date"
                fullWidth
                required
                value={purchaseDateTime}
                onChange={handlePurchaseDateTimeChange}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                type="text"
                fullWidth
                required
                label="Alış Numarası"
                value={purchaseNumber}
                onChange={handlePurchaseNumberChange}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                type="text"
                fullWidth
                required
                label="Ürün Adı"
                value={productName}
                onChange={handleProductNameChange}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                type="number"
                min={0}
                fullWidth
                required
                label="Birimi Başına Fiyat"
                value={pricePerUnit}
                onChange={handlePricePerUnitChange}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                type="number"
                min={1}
                fullWidth
                required
                label="Miktar"
                value={quantity}
                onChange={handleQuantityChange}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                type="number"
                min={0}
                fullWidth
                required
                label="Toplam Tutar"
                value={totalAmount}
                onChange={handleTotalAmountChange}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                type="number"
                min={0}
                fullWidth
                required
                label="Komisyon"
                value={commission}
                onChange={handleCommissionChange}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                type="number"
                min={0}
                fullWidth
                required
                label="Komisyon İadesi"
                value={commissionReturn}
                onChange={handleCommissionReturnChange}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                type="text"
                fullWidth
                required
                label="Resim Bağlantısı"
                value={imageLink}
                onChange={handleImageLinkChange}
              />
            </Grid>
            <Grid size={12}>
              <FormControl fullWidth required>
                <InputLabel id="demo-simple-select-label">Atanan</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={assignedTo}
                  label="Atanan"
                  onChange={handleChangeAssignment}
                >
                  {users.map(({ _id, phone }, index) => (
                    <MenuItem key={index} value={_id}>
                      <Phone style={{ marginRight: "8px" }} />
                      {phone}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleSubmitForm}
          fullWidth
          variant="contained"
          color="primary"
        >
          Gönder
        </Button>
        <Button
          onClick={handleClose}
          fullWidth
          variant="outlined"
          color="error"
        >
          İptal
        </Button>
      </DialogActions>
    </Dialog>
  );
}
