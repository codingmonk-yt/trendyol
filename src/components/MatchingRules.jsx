import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const RULES = [
  {
    key: 0,
    content:
      "1. Trendyol'un sipariş alma sistemi 24 saat açıktır. Platform sistemi, sipariş alma, para çekme ve yükleme gibi işlevleri otomatik olarak gerçekleştirir.",
  },
  {
    key: 1,
    content:
      "2. Kullanıcıların sipariş vermeden önce müşteri hizmetleri ile iletişime geçerek cüzdan adresi alması ve bakiye yüklemesi gerekmektedir. Yeni kullanıcılar, ilk siparişlerini vermeden önce bir teslimat adresi eklemelidir.",
  },
  {
    key: 2,
    content:
      "3. Sipariş tutarı, Trendyol sistemi tarafından otomatik olarak eşleştirilir. Eşleştirilen sipariş tutarları hesap bakiyeleri arasındadır. Sipariş alındıktan sonra bir sonraki bakiye yükleme turu gerçekleştirilecektir.",
  },
  {
    key: 3,
    content:
      "4. Tüm üyelik seviyelerindeki kullanıcılar günde 19 sipariş tamamlayabilir ve para çekme işlemi için her vip görev siparişleri başarılı bir şekilde alınmalıdır. Para çekme işlemlerinde zaman sınırlaması yoktur ve spesifik varış zamanı sistem onayına tabidir.",
  },
  {
    key: 4,
    content: "5. Sipariş uzun süre tamamlanmazsa, sipariş dondurulur.",
  },
  {
    key: 5,
    content:
      "6. Trendyol platformunun gelecekteki gelişim yönü Avrupa merkezli olduğundan, platform üye işletmeleri büyük miktarda sipariş dağıtır. Popüler bir üye işletme olmak için çalışanların platform disiplinlerine uyması ve işletmelerinin zarar görmemesi gerekir.",
  },
];

export default function MatchingRules({ open, handleClose }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
    >
      <DialogTitle>Eşleştirme Kuralları</DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          {RULES.map(({ key, content }) => (
            <Typography key={key} variant="body2">
              {content}
            </Typography>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>
          Kapat
        </Button>
      </DialogActions>
    </Dialog>
  );
}
