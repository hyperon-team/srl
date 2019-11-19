import http from 'http';
import https from 'https';
import uri from 'url';

function genReqFunc(method) {
  return (url, options, cb) => {
    if (!url || !['string', 'object'].includes(typeof url)) throw new Error();
    if (typeof options === 'function') cb = options;
    if (typeof options !== 'object') options = {};
    if (typeof url === 'object') options = url;
    options = { ...uri.parse(url), ...options, method };
    const req = options.protocol === 'http:' ? http : https;
    const promise = new Promise((resolve, reject) => {
      req
        .request(options, res => {
          const chunks = [];
          res
            .on('data', chunk => chunks.push(chunk))
            .on('end', () => {
              const body = Buffer.concat(chunks);
              if (cb) cb(null, body, res);
              return resolve(body);
            })
            .on('error', err => {
              if (cb) cb(err);
              return reject(err);
            });
        })
        .on('error', err => {
          if (cb) cb(err);
          return reject(err);
        });
    });
    if (!cb) return promise;
  };
}

const request = (url, method, options, cb) => {
  if (!['string', 'object'].includes(url)) throw new Error();
  if (!['string', 'object', 'function', 'undefined'].includes(method)) {
    throw new Error();
  }
  if (!['object', 'function', 'undefined'].includes(options)) throw new Error();
  if (!['function', 'undefined'].includes(cb)) throw new Error();
  if (typeof options === 'function') cb = options;
  if (typeof method === 'function') cb = method;
  if (typeof method === 'object') options = method;
  if (typeof url === 'object') options = url;
  if (typeof method === 'string') options.method = method;
  if (typeof url === 'string') options.url = url;
  ({ method } = options);
  const req = method.toUpperCase();
  return genReqFunc(req)(options, cb);
};

request.get = genReqFunc('GET');
request.post = genReqFunc('POST');

export default request;
