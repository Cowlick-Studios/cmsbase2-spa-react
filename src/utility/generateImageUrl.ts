const generateImageUrl = (route: string = '', tenant = null) => {

  const tld = process.env.REACT_APP_TLD;

  if(tenant){
    if(tld === "localhost"){
      return `http://${tld}${route}`;
    }
    return `https://${tld}${route}`;
  }

  if(tld === "localhost"){
    return `http://${tld}${route}`;
  }
  return `https://${tld}${route}`;
}

export default generateImageUrl;