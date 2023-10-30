const regex = /@gmail.com$/;

function removeEmail(str: string) {
  return str.replace(regex, "");
}

export default removeEmail;
