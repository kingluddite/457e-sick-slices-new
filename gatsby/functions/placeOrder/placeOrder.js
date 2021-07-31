const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  console.log(order);
  return `<div>
    <h2>Your Recent Order for ${total}</h2>
    <p>Please start walking over, we will have your order ready in the next 20 minutes.</p>
    <ul>
      ${order
        .map(
          (item) => `<li>
      <img src="${item.thumbnail}" alt="${item.name}" />
      ${item.size} ${item.name} - ${item.price}
      </li>`
        )
        .join('')}
    </ul>
    <p>Your total is <strong>$${total}</strong> due at pickup</p>
    <style>
      ul {
        list-style: none;
      }
    </style>
    </div>`;
}

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PW,
  },
});

// test loading by waiting some time
function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

exports.handler = async (event, context) => {
  // we'll wait 5 seconds (testing loading)
  // await wait(5000);

  const body = JSON.parse(event.body);
  console.log(body);

  // check if they have filled out the honeypot
  if (body.blackhole) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Black holes are the seductive dragons of the universe. ERROR_ID: VH0U812',
      }),
    };
  }
  // 1. validate the data coming in is correct
  const requiredFields = ['email', 'name', 'order'];

  for (const field of requiredFields) {
    console.log(`Checking that ${field} is good`);
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You are missing the ${field} field`,
        }),
      };
    }
  }

  // validate that a pizza order actually has at least one pizza
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Houston we have a problem. No pizzas were in your pizza order Duh!`,
      }),
    };
  }

  // const errors = requiredFields.map((reqField) => {
  //   console.log(context);
  // });
  // 2. send the email
  // 3. send the success or error message
  // 4. test send and email

  // Test send an email
  const info = await transporter.sendMail({
    from: 'ZA ZA Gabore Pizza! <zaza@example.com>',
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
