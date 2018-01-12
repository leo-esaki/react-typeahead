export const funcsList = [
  {
    'name': 'count',
    'short_description': '<em>Usage</em>: <strong>count</strong>({predicate})',
    'description': '<em>Usage</em>: <strong>count</strong>({predicate})<br /><em>Example</em>: count(@created_at > “2018-01-09”))<br /><em>Predicate operators</em>: <strong>&gt;, &lt; =, &gt;=, &lt;=, NOT</strong>'
  },
  {
    'name': 'max',
    'short_description': '<em>Usage</em>: <strong>max</strong>({predicate}, {field})',
    'description': '<em>Usage</em>: <strong>max</strong>({predicate}, {field})<br /><em>Example</em>: max(@created_at > “2018-01-09”), @revenue)<br /><em>Predicate operators</em>: <strong>&gt;, &lt; =, &gt;=, &lt;=, NOT</strong>'
  },
  {
    'name': 'min',
    'short_description': '<em>Usage</em>: <strong>min</strong>({predicate}, {field})',
    'description': '<em>Usage</em>: <strong>min</strong>({predicate}, {field})<br /><em>Example</em>: min(@created_at > “2018-01-09”), @revenue)'
  },
  {
    'name': 'sum',
    'short_description': '<em>Usage</em>: <strong>sum</strong>({predicate}, {field})',
    'description': '<em>Usage</em>: <strong>sum</strong>({predicate}, {field})<br /><em>Example</em>: sum(@created_at > “2018-01-09”), @revenue)<br /><em>Predicate operators</em>: <strong>&gt;, &lt; =, &gt;=, &lt;=, NOT</strong>'
  },
  {
    'name': 'avg',
    'short_description': '<em>Usage</em>: <strong>avg</strong>({predicate}, {field})',
    'description': '<em>Usage</em>: <strong>avg</strong>({predicate}, {field})<br /><em>Example</em>: avg(@created_at > “2018-01-09”), @revenue)<br /><em>Predicate operators</em>: <strong>&gt;, &lt; =, &gt;=, &lt;=, NOT</strong>'
  }
];

export const fieldsList = [
  {
    name: '@revenue'
  },
  {
    name: '@quantity'
  },
  {
    name: '@created_at'
  }
]

export const getContext = (formula, pos) => {
  let startOfContext = pos - 1;
  if (startOfContext < 0) {
    startOfContext = 1;
  };
  let type = 'func';

  while (startOfContext > 0) {
    let char = formula[startOfContext];
    if (char === ' ' || char === '(' || char === ')' || char === ',') {
      // TODO: implement determinng the param types by function name
      if (char === '(') {
        type = 'predicate'
      } else if (char === ')') {
        type = 'end';
      } else if (pos - 1 === startOfContext) {
        type = 'delimiter';
      } else {
        type = 'field'
      }
      startOfContext++;
      break;
    }
    startOfContext--;
  }
  let endOfContext = pos;

  return {
    text: formula.substring(startOfContext, endOfContext),
    startPos: startOfContext,
    type
  };
};

export const filterList = (context) => {
  if (!context) return [];
  const { text, type } = context;
  if (type === 'func') {
    if (!text) {
      return funcsList;
    } else {
      return funcsList.filter((choice) => choice.name.indexOf(text) !== -1);
    }
  } else if (type === 'delimiter') {
    return [];
  } else {
    return fieldsList.filter((choice) => choice.name.indexOf(text) !== -1);
  }
};
