import Image from "next/image";

export const symbol = [
  {
    symbol: "btcusdt",
    nameShort: "BTC",
    nameLong: "Bitcoin",
    icon: (
      <Image
        src={'/coins/btc.svg'}
        alt="Bitcoin"
        className="w-7 h-7 mt-5"
        width={28} // กำหนดความกว้างตามต้องการ
        height={28} // กำหนดความสูงตามต้องการ
      />
    ),
  },
  {
    symbol: "ethusdt",
    nameShort: "ETH",
    nameLong: "Ethereum",
    icon: (
      <Image
        src={'/coins/eth.svg'}
        alt="Ethereum"
        className="w-7 h-7 mt-5"
        width={28}
        height={28}
      />
    ),
  },
  {
    symbol: "dogeusdt",
    nameShort: "DOGE",
    nameLong: "Dogecoin",
    icon: (
      <Image
        src={'/coins/doge.svg'}
        alt="Dogecoin"
        className="w-7 h-7 mt-5"
        width={28}
        height={28}
      />
    ),
  },
  {
    symbol: "bnbusdt",
    nameShort: "BNB",
    nameLong: "BNB",
    icon: (
      <Image
        src={'/coins/bnb.svg'}
        alt="BNB"
        className="w-7 h-7 mt-5"
        width={28}
        height={28}
      />
    ),
  },
  {
    symbol: "ltcusdt",
    nameShort: "LTC",
    nameLong: "Litecoin",
    icon: (
      <Image
        src={'/coins/ltc.svg'}
        alt="Litecoin"
        className="w-7 h-7 mt-5"
        width={28}
        height={28}
      />
    ),
  },
  {
    symbol: "xrpusdt",
    nameShort: "XRP",
    nameLong: "Ripple",
    icon: (
      <Image
        src={'/coins/xrp.svg'}
        alt="Ripple"
        className="w-7 h-7 mt-5"
        width={28}
        height={28}
      />
    ),
  },
  {
    symbol: "adausdt",
    nameShort: "ADA",
    nameLong: "Cardano",
    icon: (
      <Image
        src={'/coins/ada.svg'}
        alt="Cardano"
        className="w-7 h-7 mt-5"
        width={28}
        height={28}
      />
    ),
  },
  {
    symbol: "linkusdt",
    nameShort: "LINK",
    nameLong: "Chainlink",
    icon: (
      <Image
        src={'/coins/link.svg'}
        alt="Chainlink"
        className="w-7 h-7 mt-5"
        width={28}
        height={28}
      />
    ),
  },
  {
    symbol: "dotusdt",
    nameShort: "DOT",
    nameLong: "Polkadot",
    icon: (
      <Image
        src={'/coins/dot.svg'}
        alt="Polkadot"
        className="w-7 h-7 mt-5"
        width={28}
        height={28}
      />
    ),
  },
  {
    symbol: "trxusdt",
    nameShort: "TRX",
    nameLong: "Tron",
    icon: (
      <Image
        src={'/coins/trx.svg'}
        alt="Tron"
        className="w-7 h-7 mt-5"
        width={28}
        height={28}
      />
    ),
  },
];
