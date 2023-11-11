import got from "got";
import { convert } from "html-to-text";

const dataURL =
  "https://dev-cs5513-week11-petrutababei.pantheonsite.io/wp-json/twentytwentythree-child/v1/latest-posts/1";

async function getData(url) {
  let jsonString;
  try {
    jsonString = await got(url);
  } catch (error) {
    jsonString.body = [];
    console.log(error);
  }
  const jsonObj = JSON.parse(jsonString.body);
  // console.log(jsonObj);
  return jsonObj;
}

export async function getAllIds() {
  const jsonObj = await getData(dataURL);

  return jsonObj.map(function (item) {
    return {
      params: { id: item.ID.toString() },
    };
  });
}

export async function getSortedList() {
  const jsonObj = await getData(dataURL);

  jsonObj.sort(function (a, b) {
    return a.post_title.localeCompare(b.post_title);
  });
  return jsonObj.map(function (item) {
    return {
      id: item.ID.toString(),
      title: item.post_title,
      author: item.post_author,
      content: convert(item.post_content),
    };
  });
}

export async function getItemData(idRequested) {
  const jsonObj = await getData(dataURL);

  const objMatch = jsonObj.filter((obj) => {
    return obj.ID.toString() === idRequested;
  });

  let objReturned;
  if (objMatch.length > 0) {
    objReturned = objMatch[0];
  } else {
    objReturned = {};
  }
  console.log(objReturned);
  return {
    id: objReturned.ID,
    title: objReturned.post_title,
    author: objReturned.post_author,
    content: convert(objReturned.post_content),
  };
}

// export async function getBooksReadById(personId) {
//   const jsonObj = readJsonFile("books.json");

//   const objMatch = jsonObj.filter((obj) => {
//     return obj.readById.includes(parseInt(personId));
//   });

//   return objMatch.map(function (obj) {
//     return {
//       id: obj.id.toString(),
//       name: obj.name,
//       author: obj.author,
//     };
//   });
// }

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
