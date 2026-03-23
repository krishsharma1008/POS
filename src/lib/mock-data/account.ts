export const accountPersonalDetails = {
  name: "Test User",
  phone: "+6287778232299",
  email: "purbojati@proton.me",
};

export const accountBusinessInfo = {
  businessName: "Buku Bakery",
  businessAddress: "",
  province: "DKI Jakarta",
  city: "Kota Jakarta Barat",
  district: "",
  postalCode: "",
};

export const billingHistoryRows = [
  {
    id: "no-history",
    invoiceDate: "",
    invoiceNumber: "",
    period: "",
    totalAmount: "",
    status: "No Data Found",
  },
];

export const outletRows = [
  {
    id: "outlet-1",
    name: "Outlet 1",
    status: "Active",
    address: "null, null",
    phone: "+6287778232299",
    gobizLinking: "Not Linked",
  },
];

export const emailRecipients = [
  {
    id: "recipient-1",
    email: "purbojati@proton.me",
    verified: true,
  },
];

export const receiptPreviewItems = [
  {
    id: "milk-tea",
    name: "Milk Tea",
    quantity: 1,
    price: "Rp. 25.000",
    modifiers: [
      "Pearl - Sweet - Rp. 2.000",
      "Grass Jelly - Salt - Rp. 2.000",
      "Sugar - Rare - Rp. 2.000",
    ],
    promo: "Promo Sultan (0.5%)",
    promoAmount: "(Rp. 1.000)",
  },
  {
    id: "nasi-goreng",
    name: "Nasi Goreng",
    quantity: 1,
    price: "Rp. 25.000",
  },
];

export const inventoryConfigurations = {
  purchaseOrder: [
    {
      id: "simple-po",
      title: "Simple Purchase Order",
      description:
        "Assigned employees can create Purchase Order. Stock changes will be applied immediately to Inventory.",
      cta: "Create",
    },
    {
      id: "advanced-po",
      title: "Advanced Purchase Order",
      description:
        "Assigned employees can create Purchase Order requests. Purchase Order must be Approved and Fulfilled before stock changes can be applied to Inventory.",
      cta: "Request",
    },
  ],
  transfer: [
    {
      id: "simple-transfer",
      title: "Simple Transfer",
      description:
        "Assigned employees can create stock transfer and inventory will update immediately after submission.",
      cta: "Transfer",
    },
    {
      id: "advanced-transfer",
      title: "Advanced Transfer",
      description:
        "Assigned employees can submit transfer requests that require review before stock is received at destination outlet.",
      cta: "Request",
    },
  ],
};
