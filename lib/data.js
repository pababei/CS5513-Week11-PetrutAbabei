// need the node modules for fs and path
import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

function readJsonFile(fileName) {
  const filePath = path.join(dataDir, fileName);
  const jsonString = fs.readFileSync(filePath, "utf8");
  const jsonObj = JSON.parse(jsonString);
  return jsonObj;
}

export function getSortedList() {
  const jsonObj = readJsonFile("people.json");
  jsonObj.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });
  return jsonObj.map(function (item) {
    return {
      id: item.id.toString(),
      name: item.name,
    };
  });
}

export function getAllIds() {
  const jsonObj = readJsonFile("people.json");
  return jsonObj.map(function (item) {
    return {
      params: { id: item.id.toString() },
    };
  });
}

export async function getData(idRequested) {
  const jsonObj = readJsonFile("people.json");

  const objMatch = jsonObj.filter((obj) => {
    return obj.id.toString() === idRequested;
  });

  let objReturned;
  if (objMatch.length > 0) {
    objReturned = objMatch[0];
  } else {
    objReturned = {};
  }
  return objReturned;
}

export async function getBooksReadById(personId) {
  const jsonObj = readJsonFile("books.json");

  const objMatch = jsonObj.filter((obj) => {
    return obj.readById.includes(parseInt(personId));
  });

  return objMatch.map(function (obj) {
    return {
      id: obj.id.toString(),
      name: obj.name,
      author: obj.author,
    };
  });
}

export function getAllBookIds() {
  const jsonObj = readJsonFile("books.json");
  return jsonObj.map(function (item) {
    return {
      params: { id: item.id.toString() },
    };
  });
}

export async function getBookData(idRequested) {
  const jsonObj = readJsonFile("books.json");

  const objMatch = jsonObj.filter((obj) => {
    return obj.id.toString() === idRequested;
  });

  let objReturned;
  if (objMatch.length > 0) {
    objReturned = objMatch[0];
  } else {
    objReturned = {};
  }
  return objReturned;
}
