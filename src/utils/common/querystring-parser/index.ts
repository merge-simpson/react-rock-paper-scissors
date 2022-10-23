interface QuerystringManager {
  readonly querystringFrom: (data: any) => string | null;
  readonly parse: (querystring: string) => any;
}

const querystringParser: QuerystringManager = {
  querystringFrom: (data) => {
    // Null or not a dictionary
    if (data?.constructor != Object) {
      const error = new Error(`Parameter required. And it must be dictionary.`);
      console.error(error.stack);
      return null;
    }

    return `?${
      /* */
      Object.keys(data)
        .map((keyName) => `${keyName}=${data[keyName]}`)
        .join("&")
    }`;
  },
  parse: (querystring) => {
    if (!querystring) {
      return null;
    }

    return querystring
      .slice(1)
      .split(/&/g)
      .reduce<{ [key: string]: string }>((acc, cur) => {
        const [name, value] = cur.split(/=/g);
        return !!name ? { ...acc, [name]: value } : acc;
      }, {});
  },
};

export default querystringParser;
