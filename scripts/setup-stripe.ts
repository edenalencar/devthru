
import fs from 'fs';
import path from 'path';
import Stripe from 'stripe';

async function main() {
    // Read .env.local manually to get the key
    const envPath = path.resolve(process.cwd(), '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const match = envContent.match(/STRIPE_SECRET_KEY=(sk_test_[a-zA-Z0-9]+)/);

    if (!match) {
        console.error("Could not find STRIPE_SECRET_KEY in .env.local");
        process.exit(1);
    }

    const stripeKey = match[1];
    const stripe = new Stripe(stripeKey, { apiVersion: '2024-11-20.acacia' }); // Utilizing likely latest or default

    console.log("Creating products...");

    // Create Pro Product
    const proProduct = await stripe.products.create({
        name: 'Pro',
        description: 'Para profissionais e freelancers',
        metadata: {
            slug: 'pro'
        }
    });
    console.log("Pro Product:", proProduct.id);

    // Create Pro Price
    const proPrice = await stripe.prices.create({
        product: proProduct.id,
        unit_amount: 2900,
        currency: 'brl',
        recurring: {
            interval: 'month'
        },
        metadata: {
            slug: 'pro'
        }
    });
    console.log("Pro Price:", proPrice.id);

    // Create Business Product
    const businessProduct = await stripe.products.create({
        name: 'Business',
        description: 'Para times e empresas',
        metadata: {
            slug: 'business'
        }
    });
    console.log("Business Product:", businessProduct.id);

    // Create Business Price
    const businessPrice = await stripe.prices.create({
        product: businessProduct.id,
        unit_amount: 9900,
        currency: 'brl',
        recurring: {
            interval: 'month'
        },
        metadata: {
            slug: 'business'
        }
    });
    console.log("Business Price:", businessPrice.id);

    console.log("--- RESULTS ---");
    console.log(`PRO_PRICE_ID=${proPrice.id}`);
    console.log(`BUSINESS_PRICE_ID=${businessPrice.id}`);
}

main().catch(console.error);
