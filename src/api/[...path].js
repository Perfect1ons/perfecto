import httpProxy from "http-proxy";

const MAXKG = process.env.MAXKG; // The actual URL of your API

const proxy = httpProxy.createProxyServer();

// Make sure that we don't parse JSON bodies on this route:
export const config = {
  api: {
    bodyParser: false,
  },
};

export default (req, res) => {
  return new Promise((resolve, reject) => {
    proxy.web(req, res, { target: MAXKG, changeOrigin: true }, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};

// const yourExportedFunction = (req, res) => {
//   return new Promise((resolve, reject) => {
//     proxy.web(req, res, { target: MAXKG, changeOrigin: true }, (err) => {
//       if (err) {
//         return reject(err);
//       }
//       resolve();
//     });
//   });
// };

// export default yourExportedFunction;
