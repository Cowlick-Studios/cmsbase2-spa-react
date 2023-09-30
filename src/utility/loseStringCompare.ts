const looseStringCompare = (compareString: string, compareItemList: string[]) => {
  let allMatching = false;

  if(compareString !== ""){
    for(const compareItem of compareItemList){
      if(compareItem.toLowerCase().includes(compareString.toLowerCase())){
        allMatching = true;
      }
    }
  } else {
    allMatching = true;
  }

  return allMatching;
}

export default looseStringCompare;