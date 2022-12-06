/*
 * Reglas:
 * El final de cada nivel debe ser el inicio del siguiente
*/

const emojis = {
    '-': ' ',
    'O': '🚪',
    'X': '💣',
    'I': '🎁',
    'PLAYER': '💀',
    'BOMB_COLLISION': '🔥',
    'GAME_OVER': '👎',
    'WIN': '🏆',
    'HEART': '❤️'
  };
  
  const maps = [];
//   maps.push(`
//   X---XXXXXXXXX---X
//   X-X--XXXXXXX--X-X
//   X--X--XXXXX--X--X
//   XX-XX--XXX--XX-XX
//   XX--XX--X--XX--XX
//   XXX--XX---XX--XXX
//   XXXX--XX-XX--XXXX
//   XXXXX--XIX--XXXXX
//   XXXXXX-XXX-XXXXXX
//   XXXXX--XOX--XXXXX
//   XXXX--X---X--XXXX
//   XXX--X--X--X--XXX
//   XX--X--XXX--X--XX
//   X--X--XXXXX--X--X
//   --X--XXXXXXX--X--
//   -X--XXXXXXXXX--X-
//   ---XXXXXXXXXXX---
// `);
maps.push(`
  IXXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  OXXXXXXXXX
`);
maps.push(`
  O--XXXXXXX
  X--XXXXXXX
  XX----XXXX
  X--XX-XXXX
  X-XXX--XXX
  X-XXXX-XXX
  XX--XX--XX
  XX--XXX-XX
  XXXX---IXX
  XXXXXXXXXX
  `);
maps.push(`
  I-----XXXX
  XXXXX-XXXX
  XX----XXXX
  XX-XXXXXXX
  XX-----XXX
  XXXXXX-XXX
  XX-----XXX
  XX-XXXXXXX
  XX-----OXX
  XXXXXXXXXX
`);
  // maps.push(`
  //   IXXXXXXXXX
  //   -XXXXXXXXX
  //   -XXXXXXXXX
  //   -XXXXXXXXX
  //   -XXXXXXXXX
  //   -XXXXXXXXX
  //   -XXXXXXXXX
  //   -XXXXXXXXX
  //   -XXXXXXXXX
  //   OXXXXXXXXX
  // `);
  maps.push(`
    O--XXXXXXX
    X--XXXXXXX
    XX----XXXX
    X--XX-XXXX
    X-XXX--XXX
    X-XXXX-XXX
    XX--XX---X
    XXXXXXIX-X
    XX--XX---X
    XXXXXXXXXX
    `);
  //   maps.push(`
  //   XXXXXXXXXX
  //   X--------X
  //   X-XXXXXX-X
  //   X-XXXXXX-X
  //   X-XXXXXX-X
  //   X-XXXXXX-X
  //   X-XXXXXX-X
  //   X-XXXXO--X
  //   X-XXXXXXXX
  //   X--------I
  // `);
  // maps.push(`
  //   XXXXXXXXXX
  //   X--------X
  //   X-XXXXXX-X
  //   X-XXXXXX-X
  //   X-XXXXI--X
  //   X-XXXXXX-X
  //   X-XXXXXX-X
  //   X-XXXXXX-X
  //   X-XXXXXXXX
  //   X--------O
  // `);
  // maps.push(`
  //   XXXXXXXXXX
  //   X--------X
  //   X-XXXXXX-X
  //   X-XXXXXX-X
  //   X-XXXXO--X
  //   X-XXXXXX-X
  //   X-XXXXXX-X
  //   X-XXXXXX-X
  //   X------IXX
  //   XXXXXXXXXX
  // `);
  // maps.push(`
  //   I-----XXXX
  //   XXXXX-XXXX
  //   XX----XXXX
  //   XX-XXXXXXX
  //   XX-----XXX
  //   XXXXXX-XXX
  //   XX-----XXX
  //   XX-XXXXXXX
  //   XX-----OXX
  //   XXXXXXXXXX
  // `);
  // maps.push(`
  //   O-------XX
  //   XXXXXXX-XX
  //   XX------XX
  //   XX-XXXXXXX
  //   XX-XXX----
  //   XX-----XX-
  //   XXXXXXXXX-
  //   XXXXXX----
  //   XX-----XXX
  //   XXIXXXXXXX
  // `);
  // maps.push(`
  //   ----------
  //   -XXXXXXXX-
  //   -X--------
  //   -X-XXXXXXX
  //   -X--------
  //   -XXXXXXXX-
  //   -X--------
  //   -X-XXXXXXX
  //   IX--------
  //   XXOXXXXXXX
  // `);
  // maps.push(`
  //   ----------
  //   -XXXXXXXX-
  //   -X--------
  //   -X-XXXXXX-
  //   -X--------
  //   -XXXXXXXX-
  //   -X--------
  //   -X-XXXXXXX
  //   OX--------
  //   XXIXXXXXXX
  // `);
  // maps.push(`
  //   I---------
  //   XXXXXXXXX-
  //   XXXXXXXXX-
  //   XXXXXXXXX-
  //   XXXXXXXXX-
  //   XXXXXXXXX-
  //   XXXXXXXXX-
  //   XXXXXXXXX-
  //   XXXXXXXXX-
  //   XXO-------
  // `);