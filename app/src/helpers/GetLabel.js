/**
 * GetLabel accepts label list as an object from backend
 * and sneaker's labels array and returns a correct label string
 */
export default function GetLabel(labelsList = {}, labelsArray = []) {
  let tag;
  labelsArray.forEach((tagId) => {
    if (labelsList && labelsList.sale && labelsList.sale.id === tagId) tag = 'sale';
    if (labelsList && labelsList.new && labelsList.new.id === tagId) tag = 'new';
  });
  return tag;
}
