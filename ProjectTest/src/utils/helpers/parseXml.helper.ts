import xml2js from "xml2js";

const parseXml = async (data) => {
  const parser = new xml2js.Parser({ explicitArray: false });
  return new Promise((resolve, reject) => {
    parser.parseString(data, async (err, result) => {
      if (err) reject(err)
      resolve(result)
    })
  })
}

export default parseXml