// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// {
//       pg_service_charge_bdt: '775.78',
//       amount_original: '23870.00',
//       gateway_fee: '',
//       pg_service_charge_usd: 'Not-Available',
//       pg_card_bank_name: 'Not Available',
//       pg_card_bank_country: 'Not Available',
//       card_number: '1234XXXXXXXXX123',
//       card_holder: '',
//       status_code: '2',
//       pay_status: 'Successful',
//       success_url: 'http://localhost:3000/api/payment/success',
//       fail_url: 'http://localhost:3000/cart/checkout',
//       cus_name: 'মহিউদ্দিন মাহিন ',
//       cus_email: 't@g.com',
//       cus_phone: '8801732629875',
//       currency_merchant: 'BDT',
//       convertion_rate: '',
//       ip_address: '103.162.51.216',
//       other_currency: '23870.00',
//       pg_txnid: 'AAM1686815063103330',
//       epw_txnid: 'AAM1686815063103330',
//       mer_txnid: 'c962833d-0480-40a9-a807-aef30be46aea',
//       store_id: 'aamarpaytest',
//       merchant_id: 'aamarpaytest',
//       currency: 'BDT',
//       store_amount: '23094.22',
//       pay_time: '2023-06-15 13:45:07',
//       amount: '23870.00',
//       bank_txn: '1018941351110',
//       card_type: 'DBBL-VISA',
//       reason: 'Not Available',
//       pg_card_risklevel: '0',
//       pg_error_code_details: 'Not Available',
//       opt_a: '',
//       opt_b: '',
//       opt_c: '',
//       opt_d: ''

import axiosInstance from "../../../src/config/axios";

//     }
export default async function handler(req, res) {
  try {
    const data = await req.body;
    if (data && data?.pay_status?.toLowerCase() === "successful") {
      // console.log(data.opt_b);
      // const getArr = JSON.parse(data.opt_b);
      const makeOrderData = {
        buyer_id: data?.opt_a,
        buyer_name: data?.cus_name,
        buyer_phone: data?.cus_phone,
        buyer_address: data?.opt_c,
        pay_amount: data?.amount,
        currency: data?.currency,
        pay_status: "Paid",
        buyer_ip: data?.ip_address,
        pay_time: data?.pay_time,
        order_time: data?.pay_time,
        cart_items: data?.opt_b,
        acceptance: "Approved",
      };
      const orderRes = await axiosInstance.post("/user_orders", makeOrderData);
      if (orderRes?.status === 201) {
        res.redirect(307, `/cart/checkout/${orderRes?.data?.order_id}`).end();
      }
    }
  } catch (error) {
    console.log(error);
  }
}
