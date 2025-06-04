export async function extractValues(jsonString) {
  try {
    let dataString;

    try {
      const parsedObject = JSON.parse(jsonString);
      if (!parsedObject || typeof parsedObject.data !== 'string') {
        return null;
      }
      dataString = parsedObject.data;
    } catch (jsonError) {
      dataString = jsonString;
    }

    const regexTransfer = /transfer\("([^"]+)",\s*(\d+)\)/;
    const regexCallContract = /callContract\("([^"]+)",\s*"transfer",\s*"([^"]+)",\s*(\d+)\)/;

    let matches = dataString?.match(regexTransfer);
    if (matches) {
      const address = matches[1];
      const amount = matches[2];
      return { address, amount };
    }

    matches = dataString.match(regexCallContract);
    if (matches) {
      const token = matches[1];
      const address = matches[2];
      const amount = matches[3];
      return { token, address, amount };
    }

    return null;
  } catch (error) {
    console.log('Error parsing JSON or extracting values:', error);
  }
}
