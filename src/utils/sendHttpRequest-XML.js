export default function sendHttpRequest(method, url) {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.onload = function () {
      resolve(xhr.responseXML);
    };

    xhr.send();
  });
  return promise;
}
