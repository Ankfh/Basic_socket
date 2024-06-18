let routerMediaSoup;
let transportMediaSoup;
let producer = [];
const addRouter = (router) => {
  routerMediaSoup = router;
};

const getRouter = () => {
  return routerMediaSoup;
};

//////add producer
const addProducer = (newProducer) => {
  producer.push(newProducer);
};

//////get producer
const getPoducer = () => {
  return producer;
};

//
const getTransport = () => {
  return transportMediaSoup;
};

/////
const addTransport = (transport) => {
  transportMediaSoup = transport;
};

///////////////////////
module.exports = {
  addRouter,
  getRouter,
  addTransport,
  getTransport,
  addProducer,
  getPoducer,
};
