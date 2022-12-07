export const orderNumGenerated = () => {
  const generateOrderNum = "0123456789";

  let myCode = "";
  for (let i = 0; i < generateOrderNum.length; i++) {
    let code = Math.floor(Math.random() * generateOrderNum.length);
    myCode += generateOrderNum[code];
  }
  return myCode;
};
