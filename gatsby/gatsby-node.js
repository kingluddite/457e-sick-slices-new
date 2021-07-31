import path from 'path';
import fetch from 'isomorphic-fetch';

async function turnPizzasIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  //  2. query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  //  3. Loop over each pizza and creete a page for that pizza
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      // What is the URL for this new page??
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');
  //  2. query all pizzas
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  //  3. Loop over each pizza and creete a page for that pizza
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      // What is the URL for this new page??
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        // TODO: Regex for Topping
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
}

async function fetchBeersAndTurnIntoNodes({ actions, createNodeId, createContentDigest }) {
  // 1. fetch a list of beers
  const res = await fetch(`https://api.sampleapis.com/beers/ale`);
  const beers = await res.json();
  // 2. Loop through beers
  for (const beer of beers) {
    // make sure the api has beer names
    if (!beer.name) return;

    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    // 3. create a node for that beer
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  }
}

async function turnSlicemastersIntoPages({ graphql, actions }) {
  // 1. query all slicemasters
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        nodes {
          name
          slug {
            current
          }
          _id
        }
        totalCount
      }
    }
  `);
  // 2. TODO: turn each slicemaster into their own page
  data.slicemasters.nodes.forEach((slicemaster) => {
    actions.createPage({
      // What is the URL for this new page??
      component: path.resolve('./src/templates/Slicemaster.js'),
      path: `/slicemaster/${slicemaster.slug.current}`,
      // This data is passed to the template when we create it
      context: {
        name: slicemaster.name,
        slug: slicemaster.slug.current,
      },
    });
  });
  // 3. Determine how many pages ther are based on how many
  //       slicemasters there are, and how many per page?
  //       example: 10 / 2 = 5
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
  console.log(
    `There are ${Math.ceil(
      data.slicemasters.totalCount
    )} total pages. And we have ${pageCount} pages with ${pageSize} per page.`
  );
  // 4. Loop from 1 to n (n = number of pages we have)
  Array.from({ length: pageCount }).forEach((_, i) => {
    actions.createPage({
      // What is the URL for this new page??
      path: `slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      // This data is passed to the template when we create it
      context: {
        skip: i * pageSize, // how many people should we skip? (if we are querying 4 slicemasters but we are on page 2, we need to tell it give me 4 but skip the first 4)
        currentPage: i + 1,
        pageSize,
      },
    });
  });
  // 5. modify slicemasters.js query to accept argument to only pull 4 records at a time
  //       and skip over items to make the pagination functional
}

export async function sourceNodes(params) {
  // fetch a list of beers and source them into our gatsby API
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

export async function createPages(params) {
  // Create pages dynamically
  // 1. Pizzas
  await Promise.all([turnPizzasIntoPages(params), turnToppingsIntoPages(params), turnSlicemastersIntoPages(params)]);
  // 2. Toppings
  // 3. Slicemasters
}
