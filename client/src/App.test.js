import {isHighCard, isPair, isThreeOfAKind, isFourOfAKind, isStraight,
  isFlush, isFullHouse, isBomb, isStraightFlush, getHandType, HandType,
  rankMatch, evaluateHand, isValidNextHand, HighCardRanking, areEqual, App} from './App';

test('High Card 1', () => {
  const hand = ["Ah"];
  expect(isHighCard(hand)).toBe(true);
})

test('High Card 2', () => {
  const hand = ["Ah", "Kh"];
  expect(isHighCard(hand)).toBe(false);
})

test("Pair 1", () => {
  const hand = ["Ah", "Kh"];
  expect(isPair(hand)).toBe(false);
})

test("Pair 2", () => {
  const hand = ["Ah", "Kh", "Qh"];
  expect(isPair(hand)).toBe(false);
})

test("Pair 3", () => {
  const hand = ["Ah", "Ad"];
  expect(isPair(hand)).toBe(true);
})

test("Pair 4", () => {
  const hand = ["3s", "3c"];
  expect(isPair(hand)).toBe(true);
})

test("Pair 5", () => {
  const hand = ["Ah"];
  expect(isPair(hand)).toBe(false);
})

test("ThreeOfAKind 1", () => {
  const hand = ["Ah", "Ad"];
  expect(isThreeOfAKind(hand)).toBe(false);
})

test("ThreeOfAKind 2", () => {
  const hand = ["Ah", "Ad", "As"];
  expect(isThreeOfAKind(hand)).toBe(true);
})

test("ThreeOfAKind 3", () => {
  const hand = ["2h", "2c", "2s"];
  expect(isThreeOfAKind(hand)).toBe(true);
})

test("ThreeOfAKind 4", () => {
  const hand = ["2h", "2c", "2s", "2d"];
  expect(isThreeOfAKind(hand)).toBe(false);
})

test("FourOfAKind 1", () => {
  const hand = ["Ah", "Ad", "Kh", "Qh"];
  expect(isFourOfAKind(hand)).toBe(false);
})

test("FourOfAKind 2", () => {
  const hand = ["Ah", "Ad", "Ac", "As", "Kh"];
  expect(isFourOfAKind(hand)).toBe(false);
})

test("FourOfAKind 3", () => {
  const hand = ["3h", "3d", "3c", "3s"];
  expect(isFourOfAKind(hand)).toBe(true);
})

test("Straight 1", () => {
  const hand = ["10h", "Jd", "Qc", "Ks", "Ah"];
  expect(isStraight(hand)).toBe(true);
})

test("Straight 2", () => {
  const hand = ["3h", "4d", "5c", "6s", "2h"];
  expect(isStraight(hand)).toBe(true);
})

test("Straight 3", () => {
  const hand = ["8h", "9d", "10c", "Js", "Qh"];
  expect(isStraight(hand)).toBe(true);
})

test("Straight 4", () => {
  const hand = ["7h", "9d", "10c", "Js", "Qh"];
  expect(isStraight(hand)).toBe(false);
})

test("Straight 5", () => {
  const hand = ["3h", "4d", "5c", "7s", "2h"];
  expect(isStraight(hand)).toBe(false);
})

test("Straight 6", () => {
  const hand = ["3h", "4d", "5c", "6s", "7h", "2h"];
  expect(isStraight(hand)).toBe(false);
})

test("Straight 7", () => {
  const hand = ["9h", "8s", "5c", "7s", "6h"];
  expect(isStraight(hand)).toBe(true);
})

test("Flush 1", () => {
  const hand = ["3h", "4d", "5c", "6s", "7h"];
  expect(isFlush(hand)).toBe(false);
})

test("Flush 2", () => {
  const hand = ["10h", "4h", "5h", "6h", "7h"];
  expect(isFlush(hand)).toBe(true);
})

test("Flush 3", () => {
  const hand = ["2s", "4h", "5h", "6h", "7h"];
  expect(isFlush(hand)).toBe(false);
})

test("Flush 4", () => {
  const hand = ["2s", "4s", "5s", "6s", "7h"];
  expect(isFlush(hand)).toBe(false);
})

test("Flush 5", () => {
  const hand = ["2s", "4s", "5s", "6s", "7s"];
  expect(isFlush(hand)).toBe(true);
})

test("Flush 6", () => {
  const hand = ["2c", "4c", "5c", "6c", "7c"];
  expect(isFlush(hand)).toBe(true);
})

test("FullHouse 1", () => {
  const hand = ["2c", "2s", "2h", "6c", "6h", "6c"];
  expect(isFullHouse(hand)).toBe(false);
})

test("FullHouse 2", () => {
  const hand = ["2c", "2s", "2h", "6c", "6h"];
  expect(isFullHouse(hand)).toBe(true);
})

test("FullHouse 3", () => {
  const hand = ["10c", "10s", "Jc", "Jh", "Jc"];
  expect(isFullHouse(hand)).toBe(true);
})

test("FullHouse 4", () => {
  const hand = ["10c", "Js", "Jc", "Jh", "Jc"];
  expect(isFullHouse(hand)).toBe(false);
})

test("Bomb 1", () => {
  const hand = ["10c", "10s", "10s", "10h", "Jc"];
  expect(isBomb(hand)).toBe(true);
})

test("Bomb 2", () => {
  const hand = ["10c", "10s", "10s", "10h", "10s"];
  expect(isBomb(hand)).toBe(false);
})

test("Bomb 3", () => {
  const hand = ["9h", "10s", "10s", "10h", "10c"];
  expect(isBomb(hand)).toBe(true);
})

test("Bomb 3", () => {
  const hand = ["8c", "8s", "8h", "10h", "8d"];
  expect(isBomb(hand)).toBe(true);
})  

test("Straight Flush 1", () => {
  const hand = ["3s", "4s", "5s", "6s", "2s"];
  expect(isStraightFlush(hand)).toBe(true);
})

test("Straight Flush 2", () => {
  const hand = ["Jh", "Qh", "Kh", "Ah", "2h"];
  expect(isStraightFlush(hand)).toBe(true);
})

test("Straight Flush 3", () => {
  const hand = ["6d", "7d", "8d", "9d", "10d"];
  expect(isStraightFlush(hand)).toBe(true);
})

test("Straight Flush 4", () => {
  const hand = ["3c", "4c", "5c", "6c", "7c"];
  expect(isStraightFlush(hand)).toBe(true);
})

test("Straight Flush 5", () => {
  const hand = ["6d", "7d", "8d", "9d", "Jd"];
  expect(isStraightFlush(hand)).toBe(false);
})

test("getHandType 1", () => {
  const hand = ["6d", "7d", "8d", "9d", "10d"];
  expect(getHandType(hand)).toBe(HandType.StraightFlush);
})

test("getHandType 2", () => {
  const hand = ["8c", "8s", "8h", "10h", "8d"];
  expect(getHandType(hand)).toBe(HandType.Bomb);
}) 

test("getHandType 3", () => {
  const hand = ["8c", "8s", "8h", "10h", "10d"];
  expect(getHandType(hand)).toBe(HandType.FullHouse);
}) 

test("getHandType 4", () => {
  const hand = ["8d", "2d", "Jd", "3d", "10d"];
  expect(getHandType(hand)).toBe(HandType.Flush);
}) 

test("getHandType 5", () => {
  const hand = ["8d", "9c", "Jd", "7s", "10d"];
  expect(getHandType(hand)).toBe(HandType.Straight);
}) 

test("getHandType 6", () => {
  const hand = ["10h", "10c", "10s", "10d"];
  expect(getHandType(hand)).toBe(HandType.FourOfAKind);
}) 

test("getHandType 7", () => {
  const hand = ["10h", "10c", "10s"];
  expect(getHandType(hand)).toBe(HandType.ThreeOfAKind);
}) 

test("getHandType 8", () => {
  const hand = ["10h", "10c"];
  expect(getHandType(hand)).toBe(HandType.Pair);
}) 

test("getHandType 9", () => {
  const hand = ["10h"];
  expect(getHandType(hand)).toBe(HandType.HighCard);
}) 

test("getHandType 10", () => {
  const hand = ["10h", "10s", "9c", ];
  expect(getHandType(hand)).toBe(HandType.Invalid);
}) 

test("isValidNextHand 1", () => {
  const prevHand = ["10h", "10c"]
  const currHand = ["10s", "9c"]
  expect(isValidNextHand(prevHand, currHand)).toBe(false);
}) 

test("isValidNextHand 2", () => {
  const prevHand = ["10h", "10c"]
  const currHand = ["9s", "9c", "9d"]
  expect(isValidNextHand(prevHand, currHand)).toBe(false);
}) 

test("isValidNextHand 3", () => {
  const prevHand = ["10h", "10c"]
  const currHand = ["9s", "9c"]
  expect(isValidNextHand(prevHand, currHand)).toBe(false);
}) 

test("isValidNextHand 4", () => {
  const prevHand = ["10h", "10c"]
  const currHand = ["Js", "Jc"]
  expect(isValidNextHand(prevHand, currHand)).toBe(true);
}) 

test("isValidNextHand 5", () => {
  const prevHand = ["10c", "10h"]
  const currHand = ["10d", "10s"]
  expect(isValidNextHand(prevHand, currHand)).toBe(true);
}) 

test("isValidNextHand 6", () => {
  const prevHand = ["2s"]
  const currHand = ["2h"]
  expect(isValidNextHand(prevHand, currHand)).toBe(false);
}) 

test("isValidNextHand 7", () => {
  const prevHand = ["3d"]
  const currHand = ["2s"]
  expect(isValidNextHand(prevHand, currHand)).toBe(true);
}) 

test("isValidNextHand 8", () => {
  const prevHand = ["10h", "10c", "10s"]
  const currHand = ["9s", "9c", "9d"]
  expect(isValidNextHand(prevHand, currHand)).toBe(false);
}) 

test("isValidNextHand 9", () => {
  const prevHand = ["10h", "10c", "10s"]
  const currHand = ["Qs", "Qc", "Qd"]
  expect(isValidNextHand(prevHand, currHand)).toBe(true);
}) 

test("isValidNextHand 10", () => {
  const prevHand = ["3h", "3c", "3s", "3d"]
  const currHand = ["Qs", "Qc", "Qd", "Qh"]
  expect(isValidNextHand(prevHand, currHand)).toBe(true);
}) 

test("isValidNextHand 11", () => {
  const prevHand = ["2h", "2c", "2s", "2d"]
  const currHand = ["Qs", "Qc", "Qd", "Qh"]
  expect(isValidNextHand(prevHand, currHand)).toBe(false);
}) 

test("isValidNextHand 12", () => {
  const prevHand = ["3d", "4c", "5c", "6h", "7c"]
  const currHand = ["3h", "4s", "5h", "6s", "7s"]
  expect(isValidNextHand(prevHand, currHand)).toBe(true);
}) 

test("isValidNextHand 13", () => {
  const prevHand = ["3d", "4c", "5c", "6h", "7s"]
  const currHand = ["3h", "4s", "5s", "6d", "7d"]
  expect(isValidNextHand(prevHand, currHand)).toBe(false);
}) 

test("isValidNextHand 14", () => {
  const prevHand = ["3d", "4c", "5c", "6h", "7s"]
  const currHand = ["10d", "4d", "5d", "6d", "2d"]
  expect(isValidNextHand(prevHand, currHand)).toBe(true);
}) 

test("isValidNextHand 15", () => {
  const prevHand = ["10d", "4d", "5d", "6d", "2d"]
  const currHand = ["3c", "4c", "10c", "5c", "6c"]
  expect(isValidNextHand(prevHand, currHand)).toBe(true);
}) 

test("isValidNextHand 16", () => {
  const prevHand = ["10s", "4s", "5s", "6s", "2s"]
  const currHand = ["3c", "4c", "10c", "5c", "6c"]
  expect(isValidNextHand(prevHand, currHand)).toBe(false);
}) 

test("isValidNextHand 17", () => {
  const prevHand = ["10d", "4d", "5d", "6d", "2d"]
  const currHand = ["3c", "3d", "3s", "5c", "5h"]
  expect(isValidNextHand(prevHand, currHand)).toBe(true);
}) 

test("isValidNextHand 18", () => {
  const prevHand = ["3c", "3d", "3s", "5c", "5h"]
  const currHand = ["Js", "10s", "4s", "Ks", "7s"]
  expect(isValidNextHand(prevHand, currHand)).toBe(false);
}) 

test("isValidNextHand 19", () => {
  const prevHand = ["2c", "3d", "4s", "5c", "6h"]
  const currHand = ["3s", "6s", "4h", "5s", "7s"]
  expect(isValidNextHand(prevHand, currHand)).toBe(true);
}) 

test("isValidNextHand 20", () => {
  const prevHand = ["7c", "3d", "4s", "5c", "6h"]
  const currHand = ["3s", "6s", "4h", "5s", "7s"]
  expect(isValidNextHand(prevHand, currHand)).toBe(true);
}) 

test("isValidNextHand 21", () => {
  const prevHand = ["3s", "6s", "4h", "5s", "7s"]
  const currHand = ["7c", "3d", "4s", "5c", "6h"]
  expect(isValidNextHand(prevHand, currHand)).toBe(false);
}) 

test("isValidNextHand 22", () => {
  const prevHand = ["2c", "Kd", "As", "Qc", "Jh"]
  const currHand = ["Js", "Qs", "Kh", "As", "2s"]
  expect(isValidNextHand(prevHand, currHand)).toBe(true);
}) 

test("isValidNextHand 23", () => {
  const prevHand = ["10d", "4d", "5d", "6d", "2d"]
  const currHand = ["3c", "3s", "3h", "4c", "4s"]
  expect(isValidNextHand(prevHand, currHand)).toBe(true);
}) 

test("isValidNextHand 24", () => {
  const prevHand = ["3c", "3s", "3h", "4c", "4s"]
  const currHand = ["10d", "4d", "5d", "6d", "2d"]
  expect(isValidNextHand(prevHand, currHand)).toBe(false);
}) 

test("isValidNextHand 25", () => {
  const prevHand = ["3c", "3s", "3h", "4c", "4s"]
  const currHand = ["10d", "10h", "10c", "10s", "8h"]
  expect(isValidNextHand(prevHand, currHand)).toBe(true);
}) 

test("isValidNextHand 25", () => {
  const prevHand = ["10d", "10h", "10c", "10s", "8h"]
  const currHand = ["10d", "9d", "8d", "7d", "Jd"]
  expect(isValidNextHand(prevHand, currHand)).toBe(true);
}) 
test("isValidNextHand 25", () => {
  const prevHand = ["10d", "9d", "8d", "7d", "Jd"]
  const currHand = ["4s", "5s", "8s", "7s", "6s"]
  expect(isValidNextHand(prevHand, currHand)).toBe(true);
}) 

test("EvaluateHand 1", () => {
  const hand = ["3h", "4s", "5h", "6s", "7s"]
  expect(evaluateHand(hand)).toBe(20);
})

test("EvaluateHand 2", () => {
  const hand = ["3h", "4s", "5h", "6s", "7s"]
  expect(evaluateHand(hand)).toBe(HighCardRanking['7s']);
})

test("EvaluateHand 3", () => {
  const hand = ["2c", "3d", "4s", "5c", "6h"]
  expect(evaluateHand(hand)).toBe(HighCardRanking['6h']);
})
test("EvaluateHand 4", () => {
  const hand = ["2c", "Qd", "Js", "Ac", "Kh"]
  expect(evaluateHand(hand)).toBe(HighCardRanking['2c']);
})







