const db = require('../config/db');

const getImages = () => {
  return new Promise((resolve, reject) => {
      db.query('SELECT * FROM images', (err, results) => {
          if (err) reject(err);
          resolve(results);
      });
  });
};

const saveImage = (id, name, url) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO images (id, name, url) VALUES (?, ?, ?)';
    db.query(query, [id, name, url], (err) => {
      if (err) reject(err);
      resolve({ id, name, url });
    });
  });
};

// const saveImageWithMultiURL = (id, name, multiurl) => {
//   return new Promise((resolve, reject) => {
//     const query = 'INSERT INTO images (id, name, multiurl) VALUES (?, ?, ?)';
//     db.query(query, [id, name, JSON.stringify(multiurl)], (err) => {
//       if (err) reject(err);
//       resolve({ id, name, multiurl });
//     });
//   });
// };
const saveImageWithMultiURL = (id, name, thumbUrl, multiUrls) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO images (id, name, url, multiurl) VALUES (?, ?, ?, ?)';
    db.query(query, [id, name, thumbUrl, JSON.stringify(multiUrls)], (err) => {
      if (err) reject(err);
      resolve({ id, name, url: thumbUrl, multiurl: multiUrls });
    });
  });
};


module.exports = { getImages, saveImage, saveImageWithMultiURL };
