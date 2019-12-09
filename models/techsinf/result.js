const Result = {
  one: ({ rows, rowCount }) => (rowCount === 0 ? null : rows[0]),
  many: ({ rows }) => rows,
  count: ({ rowCount }) => rowCount,
  exists: ({ rowCount }) => rowCount > 0,
  all: ({ rows, fields, rowCount }) => ({ rows, fields, rowCount }),
  filter: key => ({ rows, rowCount, ...rest }) => {
    if (typeof key === "string") for (row of rows) delete row[key];
    if (Array.isArray(key)) for (row of rows) for (k in key) delete row[k];
    return { rows, rowCount, ...rest };
  }
};

module.exports = Result;
