import chromaJs from 'chroma-js';

export const COLUMN_WIDTH = 250;
export const HEADER_CUSHION = 20;

const HEADER_BORDER_WIDTH = 3;

const backgroundColor = 'grey';

const genColumnHighlight = (numOfCols: number) => {
  const obj: Record<string, any> = {};

  /*
    Full Col Hover Event Highlighting
    select HeaderItem Column\d and its adjacent Data Column\d
  */
  for (let i = 0; i < numOfCols + 1; ++i) {
    obj[`&[class*="Column${i}"]`] = {
      '&:hover': {
        backgroundColor: chromaJs(backgroundColor)
          .brighten(0.5)
          .hex(),
        [`& ~ .Data [class*="Column${i}"]`]: {
          backgroundColor: chromaJs(backgroundColor)
            .brighten(0.5)
            .hex(),
        },
      },
    };
  }
  return obj;
};

export const genRegCss = (numOfCols: number) => ({
  '> div': {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  'div > div': {
    overflow: 'unset !important',
  },
  '.Grid': {
    display: 'inline-flex',
    justifyContent: 'center',
  },
  '.GridItem,.HeaderItem': {
    height: 20,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    borderStyle: 'solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textOverflow: 'ellipsis',
    backgroundColor,
    '&:hover': {
      backgroundColor: chromaJs(backgroundColor)
        .brighten(0.75)
        .hex(),
    },
  },
  '.GridItemEven': {
    backgroundColor: chromaJs(backgroundColor)
      .darken(0.75)
      .hex(),
  },
  '.HeaderItem': {
    display: 'inline-flex',
    alignItems: 'center',
    width: COLUMN_WIDTH,
    // borderWidth: HEADER_BORDER_WIDTH,
    backgroundColor: 'lightGrey',
    ...genColumnHighlight(numOfCols),
  },
  '.Data': {
    position: 'absolute',
    top: HEADER_CUSHION + HEADER_BORDER_WIDTH * 2,
  },
});

export default genRegCss;
