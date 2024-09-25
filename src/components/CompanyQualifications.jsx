import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";

export default function CompanyQualifications({ open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md" scroll="body">
      <DialogTitle>Şirket Yeterlilikleri</DialogTitle>
      <DialogContent>
        <Typography variant="body2">
          Trendyol Grubu CEO'su Erdem İnan, "2024'ün ilk çeyreği itibarıyla Doğu
          Avrupa pazarına gireceğiz. Önümüzdeki dönemde Romanya, Yunanistan,
          Macaristan ve Çek Cumhuriyeti ile başlayıp pazar ülkelerinin sayısını
          artıracağız. Amacımız, 300.000 satıcımızın tümünün Avrupa, Orta Doğu
          ve Körfez ülkeleri gibi bölgelere ürün satmasını sağlamaktır." dedi.
          NetEconomy Sınır Ötesi E-Ticaret İstasyonu'na (CBEC.100EC.CN) göre,
          Trendyol 2024'te Doğu Avrupa'ya ürün satacak. Pazar genişlemesi,
          şirketin uluslararası genişleme stratejisinin bir parçasıdır. Erdem
          İnan şu açıklamaları yaptı: "Üreticilerimizin kalite yaklaşımı, ürünler
          ve marka konumlandırması büyük bir potansiyel sunuyor. Türkiye'den
          kısa sürede ve düşük maliyetle girebileceğimiz bir bölge olması birçok
          yönden avantajlıdır. Bu pazar, Türk üreticilerinin uluslararası
          pazarlara elektronik ihracatına katkıda bulunmamızı sağlayacak." dedi.
          Ayrıca şunu ekledi: "Anahtar ülkelerdeki faaliyetlerimiz belli bir
          olgunluğa ulaştığında, Polonya, Slovakya ve Bulgaristan pazarlarına
          da gireceğiz. Amacımız, 2024 sonuna kadar Doğu Avrupa pazarında 2
          milyon aktif müşteri, 4 milyonun üzerinde sipariş hacmi ve 350 milyon
          ABD doları ticaret hacmine ulaşmaktır." Erdem İnan, uluslararası
          genişlemenin de bir hedef olduğunu vurguladı. Gelecek vizyonunun ilk
          hedefi olarak Almanya'yı belirten İnan, Almanya pazarında
          hedeflerini aştıklarını ve bir yıldan fazla bir sürede 1 milyonun
          üzerinde müşteri sayısına ulaştıklarını belirtti. Ayrıca Körfez
          Pazarı'na genişleme planlarından bahsederek, Ağustos 2023'ten bu yana
          elde edilen sonuçlardan ve bölgedeki varlığını daha da genişletmek
          için bölgenin ana şirketlerinden biri olan Cenomi Group ile yapılan
          Stratejik Ortaklıktan söz etti. Ülke büyümeye devam ediyor.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" fullWidth onClick={handleClose}>
          Kapat
        </Button>
      </DialogActions>
    </Dialog>
  );
}
