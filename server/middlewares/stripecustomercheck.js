import Stripe from 'stripe';
import _ from "lodash"

const { STRIPE_PUBLIC_KEY, STRIPE_SECRET_KEY } = process.env;
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2023-04-06',
});

async function checkCustomer(id) {
    let customer = await stripe.customers.search({
        query: `metada[\"user_id\"]:\"${id}\"`,
    }).then((d) => d)
    .catch(() => null)

    if (customer === null || _.isEmpty(customer.data)) customer == null;

    return _.get(customer, 'data.0') || null;
}

export default checkCustomer();