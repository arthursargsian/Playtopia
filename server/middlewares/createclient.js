import Stripe from 'stripe';
const { STRIPE_PUBLIC_KEY, STRIPE_SECRET_KEY } = process.env;
const stripe =  Stripe(STRIPE_SECRET_KEY)

export default async function createClient(name, lastname, email, id) {
    return new Promise(async (resolve, reject) => {
      try {
        const Customer = await stripe.customers.create({ 
          id: id,
          name: name + ' ' + lastname,
          email: email,
        });
  
        resolve(Customer);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }