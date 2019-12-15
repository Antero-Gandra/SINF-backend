const Result = {
  // Expect one result (or none)
  one: ({ rows, rowCount }) => (rowCount === 0 ? null : rows[0]),

  // Return many rows, as an array
  many: ({ rows }) => rows,

  // Return only the count of rows (for deletes)
  count: ({ rowCount }) => rowCount,

  // Return a boolean indicating whether there was a row affected
  exists: ({ rowCount }) => rowCount > 0,

  // Return the result as an object
  all: ({ rows, fields, rowCount }) => ({ rows, fields, rowCount }),

  // Filter columns from the output
  filter: key => ({ rows, rowCount, ...rest }) => {
    if (typeof key === "string") for (row of rows) delete row[key];
    if (Array.isArray(key)) for (row of rows) for (k in key) delete row[k];
    return { rows, rowCount, ...rest };
  },

  // Map using a given column
  map: key => ({ rows }) => {
    const map = {};
    for (const row in rows) {
      if (row[key] in map) throw `Map repeated key: ${row[key]}`;
      map[row[key]] = row;
    }
    return map;
  }
};

module.exports = Result;
