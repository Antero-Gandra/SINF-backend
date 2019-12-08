const Result = {
  one: ({ rows, rowCount }) => (rowCount === 0 ? null : rows[0]),
  many: ({ rows }) => rows,
  count: ({ rowCount }) => rowCount,
  all: ({ rows, fields, rowCount }) => ({ rows, fields, rowCount })
};

module.exports = Result;
