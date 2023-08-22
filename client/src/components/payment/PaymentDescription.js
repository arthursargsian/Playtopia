import React from "react";

function PaymentDescription() {
    return (
        <div className="desc-block">
            <h2 className="payment-title">Complete Your Payment</h2>
            <p className="payment-desc">
                Welcome to the Playtopi Game Store payment page, powered by the trusted Stripe system. Elevate
                your gaming journey by easily making secure payments for your favorite games, accessories, and
                in-game purchases. Here's how you can use our payment page to enhance your gaming
                experience:
            </p>
            <div className="payment-description">
                <ol>
                    <li>Card Number: Provide your credit card number without spaces or dashes.</li>
                    <li>CVC: Enter the 3-digit security code on the back of your card.</li>
                    <li>Expiration Month: Select the month your card expires from the dropdown menu.</li>
                    <li>Country: Choose your country from the list.</li>
                </ol>
            </div>
        </div>
    );
}

export default PaymentDescription;


