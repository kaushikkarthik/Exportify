function is_required(name) {
  throw new Error(`Argument, \`${name}\`, is required.`);
}

function paginated_fetch(
  url = is_required('url'), // Improvised required argument in JS
  offset = 0,
  headers,
  total,
  previousResponse = []
) {
  return fetch(`${url}?offset=${offset}&limit=50`, { headers }) // Append the page number to the base URL
    .then((response) => response.json())
    .then((newResponse) => {
      const response = [...previousResponse, newResponse]; // Combine the two arrays

      if (offset <= total) {
        offset = offset + 50;

        return paginated_fetch(url, offset, headers, total, response);
      }
      return response;
    });
}

export default paginated_fetch;
