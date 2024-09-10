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
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Company Qualifications</DialogTitle>
      <DialogContent>
        <Typography variant="body2">
          Trendyol Group CEO Erdem İnan said, "We will enter the Eastern
          European market as of the first quarter of 2024. We will start with
          Romania, Greece, Hungary and the Czech Republic in the upcoming period
          and increase the number of market countries. Our goal is to ensure
          that all of our 300,000 sellers can sell products to regions such as
          Europe, the Middle East and the Gulf countries." According to
          NetEconomy Cross-Border E-Commerce Station (CBEC.100EC.CN), Trendyol
          will sell products to Eastern Europe in 2024. Expanding the market is
          part of the company's international expansion strategy. Erdem İnan
          noted the following: "The quality approach, products and brand
          positioning of our manufacturers offer great potential. Being a region
          that we can enter from Turkey in a short time and at low cost is
          advantageous in many ways. "This market offers, we will contribute to
          the electronics export of Turkish manufacturers to international
          markets. "He also added: "When our activities in key countries reach a
          certain maturity, we will enter the Polish, Slovakian and Bulgarian
          markets. Our goal is to reach. We plan to reach 2 million active
          customers, over 4 million order volume and 350 million US dollars of
          trade volume in the Eastern European market by the end of 2024." Erdem
          İnan also emphasized that international expansion is also a goal.
          Stating Germany, which is the top priority of his future vision, as
          the first target, they exceeded their targets in the German market and
          reached over 1 million customers in more than a year. He also spoke
          about expanding into the Gulf Market and named the results achieved in
          the region since August 2023, while mentioning the Strategic
          Partnership with Cenomi Group, one of the main companies in the
          region, to further expand its presence in the Gulf. the country is
          achieving growth.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" fullWidth onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
