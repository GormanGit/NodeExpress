
var fortuneCookies = [
  "Conquer your fears or they wil conquer you.",
  "Rivers need springs.",
  "Do not fear what you dont know.",
  "You will have a pleasant surprise.",
  "Whenever possible, keep it simple.",
];

export.getFortune = function(){
  var idx = Math.floor(Math.random()* fortuneCookies.length);
  return fortuneCookies[idx];
};
