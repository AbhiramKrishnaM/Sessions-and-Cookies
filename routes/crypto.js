const express = require("express");
const BitGoJS = require("bitgo");

const bitgo = new BitGoJS.BitGo({ env: "test" });

let router = express.Router();

router.post("/create", async (req, res) => {
  console.log(req.body);

  const { coin_type, wallet_passphrase, wallet_label } = req.body;

  const accessToken = process.env.DEFAULT_ACCESS_TOKEN;

  bitgo.authenticateWithAccessToken({ accessToken });

  try {
    const wallet = await bitgo.coin(coin_type).wallets().generateWallet({
      label: wallet_label,
      passphrase: wallet_passphrase,
    });
    res.status(200).send(wallet.wallet);
  } catch (err) {
    res.status(403).json(err);
  }
});

router.post("/get-balance", async (req, res) => {
  const { coin_type, wallet_id } = req.body;
  const accessToken = process.env.DEFAULT_ACCESS_TOKEN;

  bitgo.authenticateWithAccessToken({ accessToken });

  try {
    const wallet = await bitgo.coin(coin_type).wallets().get({ id: wallet_id });
    res.status(200).json(wallet.balance());
  } catch (err) {
    res.status(403).json(err);
  }
});

module.exports = router;
