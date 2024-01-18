const special = ['אפסי', 'ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שביעי', 'שמיני', 'תשיעי', 'עשירי', 'אחד עשר', 'שנים עשר', 'שלוש עשרה', 'ארבע עשרה', 'חמש עשרה', 'שש עשרה', 'שבע עשרה', 'שמונה עשרה', 'תשע עשרה']
const special2 = ['אפסי', 'אחת', 'שתיים', 'שלש', 'ארבע', 'חמש', 'שש', 'שבע', 'שמונה', 'תשע', 'עשירי', 'אחד עשר', 'שנים עשר', 'שלוש עשרה', 'ארבע עשרה', 'חמש עשרה', 'שש עשרה', 'שבע עשרה', 'שמונה עשרה', 'תשע עשרה']
const deca = ['עשרים', 'שלושים', 'ארבעים', 'חמישים', 'שישים', 'שבעים', 'שמונים', 'תשעים']

function stringifyNumber(n) {
    if (n < 20) return special[n];
    if (n % 10 === 0) return deca[Math.floor(n / 10) - 2] ;
    return deca[Math.floor(n / 10) - 2] + ' ו' + special2[n % 10];
}
// console.clear();
// for (let i = 0; i <= 31; i++) console.log(stringifyNumber(i));

export default stringifyNumber