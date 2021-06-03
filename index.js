const fs = require("fs")

function isString(text) {
  if (text.includes('["') || text.includes('"')) return true;
}

function removeFirstSpace(text) {
  if (text[0] === " ") {
    return text.slice(1, text.length)
  } else {
    return text
  }
}

function removeFirstEmptyRows(text) {
  if (text[0] === '\n') {
    return removeFirstEmptyRows(text.slice(1, text.length))
  }
  return text
}

/**
 * Tries to find the bigges header from the md
 */
function getTitleFromMd(md) {
  const lines = md.split("\n");
  if (lines.length <= 1) return null
  for (let i = 1; i <= 6; ++i) {
    const hashes = new Array(i).fill("#").join(); + " ";
    const title = lines.find(line => line.includes(hashes));
    if (typeof title === "string") {
      return title.replace(hashes, "")
    }
  }
  return null
}

function metaToJson(text) {
  const arr = text.split("\n").filter(text => text.includes(":"))
  const mapped = arr.map(keyval => {
    const key = keyval.split(":")[0]
    const val = removeFirstSpace(keyval.split(":")[1])
    if (isString(val)) {
      return (`"${key}":${val}`)
    } else {
      return (`"${key}":"${val}"`)
    }
  })
  return JSON.parse(`{${mapped.join()}}`)
}

function parseMarkdown(givenText, filename) {
  const text = removeFirstEmptyRows(givenText)
  if (text.slice(0, 3) === "---") {
    const end = text.slice(3, text.length - 1).indexOf("---")
    const meta = `${text.slice(3, (end + 3))}`
    const content = text.slice(end + 6, text.length)
    return {
      title: getTitleFromMd(content),
      content: removeFirstEmptyRows(content),
      metadata: {
        ...metaToJson(meta),
        name: filename.replace(".md", "")
      } 
    }
  }
  return { content: text }
}

/**
 * Takes in a path to markdown file and returns a parsed json object
 * @param {string} path relative path to file
 * @returns {object} parsed metadown
 */
function metadown(path) {
  const filename = path.split("/")[path.split("/").length - 1]
  return new Promise((res, rej) => {
    fs.readFile(path, (err, data) => {
      if (err) rej(err)
      res(parseMarkdown(data.toString(), filename))
    })
  })
}

exports.metadown = metadown;
